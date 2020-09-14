import { polyfill } from 'mobile-drag-drop';
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import 'mobile-drag-drop/default.css';

// iOS/Androidのときだけ、usePolyfill=trueになる
const usePolyfill = polyfill({
	dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

if (usePolyfill) {
	// https://github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
	// このpolyfill使用の場合 dragenter イベント時に Event.preventDefault() を呼ぶ必要がある
	document.addEventListener('dragenter', (event) => {
		event.preventDefault();
	});
	// https://github.com/timruffles/mobile-drag-drop/issues/77
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	window.addEventListener('touchmove', () => {}, { passive: false });
	document.addEventListener(
		'dragstart',
		(event) => {
			if (!event.isTrusted) {
				return;
			}
			event.stopPropagation();
		},
		true,
	);
}
