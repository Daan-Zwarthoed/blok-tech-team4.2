// Dependencies
const express = require("express");
const nunjucks = require("nunjucks");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

// Routes
const homeRoutes = require("./src/routes/homeRoutes.js");
const chatRoutes = require("./src/routes/chatRoutes.js");


// Models
const User = require("./src/models/User");

// Configuration
const connectToDB = require("./src/config/mongoose.js");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

app.use(express.static("static/public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(new localStrategy((username, password, done) => {
	User.findOne({ username: username }, (err, user) => {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, (err, res) => {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

const isLoggedOut = (req, res, next) => {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}

// ROUTES
app.get('/', isLoggedIn, (req, res) => {
	res.render("index.njk");
});

app.get('/login', isLoggedOut, (req, res) => {
	res.render("login.njk");
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}));

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});


app.use("/", homeRoutes); 
app.use("/chat", chatRoutes);

let backendMessages = [
  {
    message: "hey Henk",
    userOther: "Henk",
    userSelf: "Daan",
  },
  {
    message: "hallo Daan",
    userOther: "Daan",
    userSelf: "Henk",
  },
];
io.on("connection", (socket) => {
  socket.on("join room", (message) => {
    socket.join(sortAlphabets(`${message.userSelf}${message.userOther}`));

    if (
      "DHaaeknn" === sortAlphabets(`${message.userSelf}${message.userOther}`)
    ) {
      backendMessages.forEach((backendMessage) =>
        socket.emit("chat message", {
          message: backendMessage.message,
          userOther: backendMessage.userOther,
          userSelf: backendMessage.userSelf,
        })
      );
    }
  });

  socket.on("chat message", (message) => {
    io.to(sortAlphabets(`${message.userSelf}${message.userOther}`)).emit(
      "chat message",
      { message: message.message, userSelf: message.userSelf }
    );
  });
});

nunjucks.configure("src/views/", {
  autoescape: true,
  express: app,
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectToDB();