const images = document.querySelectorAll('.imgSelf');
const hiddenImage = document.querySelector('.hiddenImage');
const loadImage = (image) => {
    hiddenImage.src = image.src;
    if (hiddenImage.width === 0) {
        image.src = '/images/defaultUser.jpeg';
    }
    hiddenImage.src = '';
};
images.forEach((image) => loadImage(image));
hiddenImage.remove();
const socket = io();
const messages = document.querySelector('.chatMessages');
const form = document.querySelector('.chatForm');
const input = document.querySelector('.chatInput');
const userOther = document.querySelector('.userOther').value;
const userSelf = document.querySelector('.userSelf').value;
window.scrollTo(0, document.body.scrollHeight);
socket.emit('join room', { userOther, userSelf });
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value) {
        socket.emit('chat message', { message: input.value, userOther, userSelf });
    }
    input.value = '';
});
socket.on('chat message', function (message) {
    const item = document.createElement('li');
    item.textContent = message.message;
    if (message.userSender === userSelf) {
        item.classList.add('messageSelf');
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    const c = typeof require == 'function' && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    const a = new Error(`Cannot find module '${i}'`);
                    throw ((a.code = 'MODULE_NOT_FOUND'), a);
                }
                const p = (n[i] = { exports: {} });
                e[i][0].call(
                    p.exports,
                    function (r) {
                        const n = e[i][1][r];
                        return o(n || r);
                    },
                    p,
                    p.exports,
                    r,
                    e,
                    n,
                    t
                );
            }
            return n[i].exports;
        }
        for (var u = typeof require == 'function' && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
    }
    return r;
})()(
    {
        1: [
            function (require, module, exports) {
                const _extends =
                    Object.assign ||
                    function (a) {
                        for (var b, c = 1; c < arguments.length; c++)
                            for (const d in ((b = arguments[c]), b))
                                Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
                        return a;
                    };
                const SwipeListener = function (a, b) {
                    if (a) {
                        typeof window != 'undefined' &&
                            (function () {
                                function a(a, b) {
                                    b = b || { bubbles: !1, cancelable: !1, detail: void 0 };
                                    const c = document.createEvent('CustomEvent');
                                    return c.initCustomEvent(a, b.bubbles, b.cancelable, b.detail), c;
                                }
                                return (
                                    typeof window.CustomEvent != 'function' &&
                                    void ((a.prototype = window.Event.prototype), (window.CustomEvent = a))
                                );
                            })();
                        b || (b = {}),
                            (b = {
                                minHorizontal: 10,
                                minVertical: 10,
                                deltaHorizontal: 3,
                                deltaVertical: 5,
                                preventScroll: !1,
                                lockAxis: !0,
                                touch: !0,
                                mouse: !0,
                                ...b,
                            });
                        let c = [];
                        let d = !1;
                        const e = function () {
                            d = !0;
                        };
                        const f = function (a) {
                            (d = !1), h(a);
                        };
                        const g = function (a) {
                            d && ((a.changedTouches = [{ clientX: a.clientX, clientY: a.clientY }]), i(a));
                        };
                        b.mouse &&
                            (a.addEventListener('mousedown', e),
                            a.addEventListener('mouseup', f),
                            a.addEventListener('mousemove', g));
                        var h = function (d) {
                            const e = Math.abs;
                            const f = Math.max;
                            const g = Math.min;
                            if (c.length) {
                                for (
                                    var h = typeof TouchEvent == 'function' && d instanceof TouchEvent,
                                        j = [],
                                        k = [],
                                        l = { top: !1, right: !1, bottom: !1, left: !1 },
                                        m = 0;
                                    m < c.length;
                                    m++
                                )
                                    j.push(c[m].x), k.push(c[m].y);
                                const i = j[0];
                                const n = j[j.length - 1];
                                const o = k[0];
                                const p = k[k.length - 1];
                                const q = { x: [i, n], y: [o, p] };
                                if (c.length > 1) {
                                    const r = { detail: { touch: h, target: d.target, ...q } };
                                    const s = new CustomEvent('swiperelease', r);
                                    a.dispatchEvent(s);
                                }
                                let t = j[0] - j[j.length - 1];
                                let u = 'none';
                                u = t > 0 ? 'left' : 'right';
                                let v;
                                let w = g.apply(Math, j);
                                let x = f.apply(Math, j);
                                if (
                                    (e(t) >= b.minHorizontal &&
                                        (u == 'left'
                                            ? ((v = e(w - j[j.length - 1])), v <= b.deltaHorizontal && (l.left = !0))
                                            : u == 'right'
                                            ? ((v = e(x - j[j.length - 1])), v <= b.deltaHorizontal && (l.right = !0))
                                            : void 0),
                                    (t = k[0] - k[k.length - 1]),
                                    (u = 'none'),
                                    (u = t > 0 ? 'top' : 'bottom'),
                                    (w = g.apply(Math, k)),
                                    (x = f.apply(Math, k)),
                                    e(t) >= b.minVertical &&
                                        (u == 'top'
                                            ? ((v = e(w - k[k.length - 1])), v <= b.deltaVertical && (l.top = !0))
                                            : u == 'bottom'
                                            ? ((v = e(x - k[k.length - 1])), v <= b.deltaVertical && (l.bottom = !0))
                                            : void 0),
                                    (c = []),
                                    l.top || l.right || l.bottom || l.left)
                                ) {
                                    b.lockAxis &&
                                        ((l.left || l.right) && e(i - n) > e(o - p)
                                            ? (l.top = l.bottom = !1)
                                            : (l.top || l.bottom) && e(i - n) < e(o - p) && (l.left = l.right = !1));
                                    const y = {
                                        detail: { directions: l, touch: h, target: d.target, ...q },
                                    };
                                    const z = new CustomEvent('swipe', y);
                                    a.dispatchEvent(z);
                                } else {
                                    const A = new CustomEvent('swipecancel', {
                                        detail: { touch: h, target: d.target, ...q },
                                    });
                                    a.dispatchEvent(A);
                                }
                            }
                        };
                        var i = function (d) {
                            const e = d.changedTouches[0];
                            if ((c.push({ x: e.clientX, y: e.clientY }), c.length > 1)) {
                                const f = c[0].x;
                                const g = c[c.length - 1].x;
                                const h = c[0].y;
                                const i = c[c.length - 1].y;
                                const j = {
                                    detail: {
                                        x: [f, g],
                                        y: [h, i],
                                        touch: typeof TouchEvent == 'function' && d instanceof TouchEvent,
                                        target: d.target,
                                    },
                                };
                                const k = new CustomEvent('swiping', j);
                                const l =
                                    !0 === b.preventScroll ||
                                    (typeof b.preventScroll == 'function' && b.preventScroll(k));
                                l && d.preventDefault(), a.dispatchEvent(k);
                            }
                        };
                        let j = !1;
                        try {
                            const k = Object.defineProperty({}, 'passive', {
                                get() {
                                    j = { passive: !b.preventScroll };
                                },
                            });
                            window.addEventListener('testPassive', null, k),
                                window.removeEventListener('testPassive', null, k);
                        } catch (a) {}
                        return (
                            b.touch && (a.addEventListener('touchmove', i, j), a.addEventListener('touchend', h)),
                            {
                                off() {
                                    a.removeEventListener('touchmove', i, j),
                                        a.removeEventListener('touchend', h),
                                        a.removeEventListener('mousedown', e),
                                        a.removeEventListener('mouseup', f),
                                        a.removeEventListener('mousemove', g);
                                },
                            }
                        );
                    }
                };
                typeof module != 'undefined' && typeof module.exports != 'undefined'
                    ? ((module.exports = SwipeListener), (module.exports.default = SwipeListener))
                    : typeof define == 'function' && define.amd
                    ? define([], function () {
                          return SwipeListener;
                      })
                    : (window.SwipeListener = SwipeListener);
            },
            {},
        ],
        2: [
            function (require, module, exports) {
                const SwipeListener = require('swipe-listener');
                const card = document.querySelector('.likeCard');
                const listener = SwipeListener(card);
                const dislike = document.querySelector('#dislike');
                const like = document.querySelector('#like');
                const submit = document.querySelector('.verzend');
                const formulier = document.querySelector('form');
                submit.hidden = true;
                card.addEventListener('swipe', function (event) {
                    const { directions } = event.detail;
                    if (directions.left) {
                        dislike.checked = true;
                        formulier.submit();
                    }
                    if (directions.right) {
                        like.checked = true;
                        formulier.submit();
                    }
                });
                like.addEventListener('click', function () {
                    formulier.submit();
                });
                dislike.addEventListener('click', function () {
                    formulier.submit();
                });
            },
            { 'swipe-listener': 1 },
        ],
    },
    {},
    [2]
);
const SwipeListener = require('swipe-listener');

const card = document.querySelector('.likeCard');
const listener = SwipeListener(card);
const dislike = document.querySelector('#dislike');
const like = document.querySelector('#like');
const submit = document.querySelector('.verzend');
const formulier = document.querySelector('form');
submit.hidden = true;
card.addEventListener('swipe', function (event) {
    const { directions } = event.detail;
    if (directions.left) {
        dislike.checked = true;
        formulier.submit();
    }
    if (directions.right) {
        like.checked = true;
        formulier.submit();
    }
});
like.addEventListener('click', function () {
    formulier.submit();
});
dislike.addEventListener('click', function () {
    formulier.submit();
});
const currentPage = window.location.pathname.split('/')[1];
const footerList = document.querySelector('.bottom-nav > nav > ul');
switch (currentPage) {
    case 'like':
    case 'filter':
        footerList.children[0].classList.add('currentPage');
        break;
    case 'chat':
        footerList.children[1].classList.add('currentPage');
        break;
    case 'profiles':
        footerList.children[2].classList.add('currentPage');
        break;
}
const header = document.querySelector('.header');
const chatHeader = document.querySelector('.chatHeader');
const body = document.querySelector('body');
let lastScrollTop = 0;
function scrollFunction() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (document.documentElement.offsetHeight <= window.innerHeight + st) return body.classList.remove('transition');
    body.classList.add('transition');
    header.classList.add('transition');
    if (st > lastScrollTop) {
        body.classList.remove('bodyPaddingTop');
        header.classList.add('headerUpwards');
        if (chatHeader) chatHeader.classList.add('chatHeaderUpwards');
    } else {
        body.classList.add('bodyPaddingTop');
        header.classList.remove('headerUpwards');
        if (chatHeader) chatHeader.classList.remove('chatHeaderUpwards');
    }
    lastScrollTop = st <= 0 ? 0 : st;
}
window.addEventListener('scroll', scrollFunction);
const formElem = document.querySelector('form');
const formLinks = document.querySelectorAll('.next-step');
const formInput = document.querySelectorAll('form input');
const generalInformationInput = document.querySelectorAll('#general-information input');
const visualInformation = document.querySelector('#visual-information');
const onboardInformation = document.querySelector('#onboard-information');
const onboardInformationInput = document.querySelectorAll('#onboard-information input');
const submitBtn = document.querySelector('button[type="submit"]');
const checkInput = (arr, form, nextInfo, event) => {
    const noInput = [];
    arr.forEach((input) => {
        if (input.value.length === 0) {
            noInput.push(input);
            input.classList.add('warning');
        }
    });
    if (noInput.length === 0) {
        form.scroll({ left: nextInfo.offsetLeft, behavior: 'smooth' });
    } else {
        const button = event.target;
        button.classList.add('warning');
        setTimeout(() => {
            button.classList.remove('warning');
        }, 3e3);
    }
};
const checkGames = (arr, event) => {
    let boolChecked = false;
    arr.forEach((input) => {
        if (input.checked) {
            boolChecked = true;
        }
    });
    if (!boolChecked) {
        event.preventDefault();
        const button = event.target;
        button.classList.add('warning');
        setTimeout(() => {
            button.classList.remove('warning');
        }, 3e3);
    }
};
const nextSequence = (form, nextInfo) => {
    form.scroll({ left: nextInfo.offsetLeft, behavior: 'smooth' });
};
const goNextSequence = (event) => {
    switch (event.target) {
        case formLinks[0]:
            event.preventDefault();
            checkInput(generalInformationInput, formElem, visualInformation, event);
            break;
        case formLinks[1]:
            event.preventDefault();
            nextSequence(formElem, onboardInformation);
            break;
        case submitBtn:
            checkGames(onboardInformationInput, event);
            break;
    }
};
formLinks.forEach((formLink) => {
    formLink.addEventListener('click', goNextSequence);
});
onboardInformationInput.forEach((input) => {
    input.addEventListener('click', (event) => {
        const card = event.target.parentNode;
        if (card.classList.contains('clicked')) {
            card.classList.remove('clicked');
        } else {
            card.classList.add('clicked');
        }
    });
});
submitBtn.addEventListener('click', goNextSequence);
formInput.forEach((input) => {
    input.addEventListener('click', () => {
        input.classList.remove('warning');
    });
});
