import React from 'react';
import { SvgXml } from 'react-native-svg';

import { Colors, Metrics } from '@styles/index';

type IconProps = {
	type: 'active' | 'inactive';
};

export const More = React.memo(({ type }: IconProps) => {
	let xml = `
  <svg width="18" height="6" viewBox="0 0 18 6">
      <g transform="translate(1 1)" stroke="#6D7486" stroke-width="1.5" fill="none" fill-rule="evenodd">
          <circle cx="2" cy="2" r="2"/>
          <circle cx="14" cy="2" r="2"/>
          <circle cx="8" cy="2" r="2"/>
      </g>
  </svg>`;
	if (type === 'active') {
		xml = `
    <svg width="18" height="6" viewBox="0 0 18 6">
      <g transform="translate(1 1)" stroke="#448E72" stroke-width="1.5" fill="none" fill-rule="evenodd">
          <circle cx="2" cy="2" r="2"/>
          <circle cx="14" cy="2" r="2"/>
          <circle cx="8" cy="2" r="2"/>
      </g>
    </svg>`;
	}
	return <SvgXml xml={xml} width={Metrics.normalize(19)} height={Metrics.normalize(6)} />;
});

export const Status = React.memo(({ type }: IconProps) => {
	let xml = `
  <svg width="18" height="19.128" viewBox="0 0 18 19.128">
    <g data-name="Group 33">
        <path data-name="Path 372" d="M23.25 15a8.25 8.25 0 1 1-12.3-7.18v.88a7.492 7.492 0 1 0 8.1-.01v-.87a8.2 8.2 0 0 1 4.2 7.18z" style="fill:#6d7486" transform="translate(-6 -4.872)"/>
        <path data-name="Path 373" d="M19.05 6.96v1.73a7.508 7.508 0 1 1-8.1.01V6.97a8.99 8.99 0 1 0 8.1-.01z" style="fill:#6d7486" transform="translate(-6 -4.872)"/>
    </g>
    <path data-name="Line 5" transform="translate(9 .75)" style="fill:none;stroke:#6d7486;stroke-linecap:round;stroke-miterlimit:10;stroke-width:1.5px" d="M0 0v10"/>
  </svg>`;
	if (type === 'active') {
		xml = `
    <svg width="18" height="19.128" viewBox="0 0 18 19.128">
      <g data-name="Group 33">
        <path data-name="Path 372" d="M23.25 15a8.25 8.25 0 1 1-12.3-7.18v.88a7.492 7.492 0 1 0 8.1-.01v-.87a8.2 8.2 0 0 1 4.2 7.18z" style="fill:#448e72" transform="translate(-6 -4.872)"/>
        <path data-name="Path 373" d="M19.05 6.96v1.73a7.508 7.508 0 1 1-8.1.01V6.97a8.99 8.99 0 1 0 8.1-.01z" style="fill:#448e72" transform="translate(-6 -4.872)"/>
      </g>
      <path data-name="Line 5" transform="translate(9 .75)" style="fill:none;stroke:#448e72;stroke-linecap:round;stroke-miterlimit:10;stroke-width:1.5px" d="M0 0v10"/>
    </svg>`;
	}
	return <SvgXml xml={xml} width={Metrics.normalize(18)} height={Metrics.normalize(19)} />;
});

export const Timeline = React.memo(({ type }: IconProps) => {
	let xml = `
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0zm4.154 10.385H9a.692.692 0 0 1-.692-.693v-6.23a.692.692 0 1 1 1.384 0V9h3.462a.692.692 0 0 1 0 1.385z" fill="#6D7486" fill-rule="nonzero"/>
  </svg>`;

	if (type === 'active') {
		xml = `
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0zm4.154 10.385H9a.692.692 0 0 1-.692-.693v-6.23a.692.692 0 1 1 1.384 0V9h3.462a.692.692 0 0 1 0 1.385z" fill="#448E72" fill-rule="nonzero"/>
    </svg>`;
	}
	return <SvgXml xml={xml} width={Metrics.normalize(18)} height={Metrics.normalize(18)} />;
});

export const Car = React.memo(({ type }: IconProps) => {
	const xml = `
    <svg width="18" height="14" viewBox="0 0 18 14">
      <g transform="translate(1 1)" stroke="${type === 'active' ? '#FFFFFF' : '#061230'}" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <path d="M0 4.667 1.717.994C1.997.396 2.71 0 3.505 0h8.99c.796 0 1.508.396 1.788.994L16 4.667m-16 0h16v6H0v-6zm1.455 6V12H0v-1.333m16 0V12h-1.455v-1.333" stroke-width=".988"/>
          <circle stroke-width=".889" fill="${type === 'active' ? '#FFFFFF' : '#061230'}" cx="2.909" cy="7.333" r="1"/>
          <circle stroke-width=".889" fill="${type === 'active' ? '#FFFFFF' : '#061230'}" cx="13.091" cy="7.333" r="1"/>
      </g>
    </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(18)} height={Metrics.normalize(14)} />;
});

export const Idle = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="16" height="16" viewBox="0 0 16 16">
    <g stroke="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-width="1.185" fill="none" fill-rule="evenodd">
        <path d="M.593.593h5.215v14.815H.593zM10.193.593h5.215v14.815h-5.215z"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(16)} height={Metrics.normalize(16)} />;
});

export const Walking = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="18" height="20" viewBox="0 0 18 20">
    <defs>
        <path id="a" d="M0 0h11v20H0z"/>
    </defs>
    <g fill="none" fill-rule="evenodd">
        <path d="M0 1h18v18H0z"/>
        <g transform="translate(4)">
            <mask id="b" fill="#fff">
                <use xlink:href="#a"/>
            </mask>
            <path d="m5.195 13.55-1.472 4.482h.613c.259 0 .468.217.468.484s-.21.484-.468.484H3.069a.433.433 0 0 1-.046-.003h-.006a.499.499 0 0 1-.077-.016l-.016-.005-.005-.002-.014-.005-.025-.01a.406.406 0 0 1-.078-.046.455.455 0 0 1-.023-.018l-.012-.01a.456.456 0 0 1-.022-.02l-.011-.012a.465.465 0 0 1-.1-.158.59.59 0 0 1-.015-.044l-.005-.023-.005-.022a.468.468 0 0 1-.004-.027l-.002-.02a.5.5 0 0 1-.002-.031v-.016l.001-.031.002-.02.003-.022.005-.027a.447.447 0 0 1 .013-.048v-.003l1.682-5.121a.465.465 0 0 1 .595-.303c.245.086.376.36.293.613m4.511-.552a.455.455 0 0 1-.175.035.47.47 0 0 1-.435-.303L7.618 8.935c-.45-1.156-.875-1.897-1.599-2.02-.23-.038-1.8-.032-2.024.007-.85.164-1.45 1.115-1.991 2.076l-.017.03.956 2.552a.489.489 0 0 1-.268.625.465.465 0 0 1-.606-.277L1.032 9.16a.497.497 0 0 1 .031-.417l.13-.23c.622-1.104 1.39-2.302 2.631-2.541.335-.065 2.05-.062 2.348-.01 1.282.218 1.868 1.463 2.316 2.613l1.478 3.795a.489.489 0 0 1-.26.63m-1.03 5.517c0 .267-.21.484-.469.484H6.941a.446.446 0 0 1-.048-.003h-.002a.477.477 0 0 1-.042-.007l-.012-.002a.442.442 0 0 1-.03-.009l-.016-.005-.025-.01-.018-.007a.456.456 0 0 1-.128-.09l-.014-.013a.437.437 0 0 1-.017-.02l-.012-.013a.475.475 0 0 1-.016-.023l-.01-.013a.447.447 0 0 1-.034-.064l-.007-.014-.011-.031-.004-.012a.522.522 0 0 1-.009-.032l-.003-.012a.48.48 0 0 1-.005-.032l-.002-.01-.001-.01v-.003l-1.168-9.48a.48.48 0 0 1 .406-.541.472.472 0 0 1 .524.419l1.117 9.07h.853c.26 0 .469.216.469.483M5.638 1.967c.561 0 1.017.471 1.017 1.05 0 .579-.456 1.05-1.017 1.05-.56 0-1.017-.472-1.017-1.05 0-.579.456-1.05 1.017-1.05m0 3.067c1.078 0 1.955-.905 1.955-2.017C7.593 1.905 6.716 1 5.638 1c-1.077 0-1.954.905-1.954 2.017 0 1.112.877 2.017 1.954 2.017" stroke="${
							type === 'active' ? '#FFFFFF' : '#061230'
						}" stroke-width=".3" fill="${type === 'active' ? '#FFFFFF' : '#061230'}" mask="url(#b)"/>
        </g>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(18)} height={Metrics.normalize(20)} />;
});

export const Cycling = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="22" height="15" viewBox="0 0 22 15">
    <defs>
        <path id="a" d="M0 0h22v15H0z"/>
    </defs>
    <g fill="none" fill-rule="evenodd">
        <mask id="b" fill="#fff">
            <use xlink:href="#a"/>
        </mask>
        <path d="M16.76 13.27c-1.937 0-3.507-1.637-3.507-3.656a3.7 3.7 0 0 1 1.632-3.081l1.61 3.23c.062.107.164.17.266.17.04 0 .102-.021.142-.042a.323.323 0 0 0 .123-.425l-1.611-3.23c.428-.17.877-.277 1.346-.277 1.937 0 3.507 1.637 3.507 3.655 0 2.02-1.57 3.656-3.507 3.656zm-6.28-3.974H9.297a4.343 4.343 0 0 0-2.08-3.422l.551-1.211h5.77L10.48 9.296zm-4.792 0 1.285-2.827a3.644 3.644 0 0 1 1.733 2.827H5.688zM5.22 13.27c-1.937 0-3.507-1.637-3.507-3.656 0-2.018 1.57-3.655 3.507-3.655.428 0 .836.085 1.203.234L4.934 9.487v.021c-.02.043-.02.064-.02.106v.022c0 .042 0 .063.02.106v.021c0 .021 0 .021.02.043 0 .021.02.021.04.042v.022c.021.02.062.042.082.063h.02c.041.022.062.022.103.022h3.487c-.143 1.848-1.632 3.315-3.467 3.315zm11.562-7.948c-.571 0-1.122.127-1.631.34l-.694-1.403V2.028a.319.319 0 0 0-.204-.298l-1.63-.637c-.164-.064-.327.02-.388.19a.31.31 0 0 0 .183.405l1.448.552v1.807H7.89V3.43h.734c.164 0 .306-.149.306-.319s-.142-.318-.306-.318H6.728c-.163 0-.306.148-.306.318s.143.32.306.32h.55v.87l-.59 1.34a3.785 3.785 0 0 0-1.469-.298C2.956 5.343 1.1 7.256 1.1 9.636s1.835 4.293 4.12 4.293c2.16 0 3.935-1.764 4.098-3.974h1.325a.287.287 0 0 0 .245-.128l3.201-4.824.51.999c-1.162.722-1.937 2.082-1.937 3.612 0 2.36 1.835 4.293 4.119 4.293S20.9 11.995 20.9 9.614c0-2.38-1.835-4.292-4.12-4.292z" stroke="${
					type === 'active' ? '#FFFFFF' : '#061230'
				}" stroke-width=".3" fill="${type === 'active' ? '#FFFFFF' : '#061230'}" mask="url(#b)"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(22)} height={Metrics.normalize(15)} />;
});

export const PublicTransport = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="13" height="20" viewBox="0 0 13 20">
    <g transform="translate(1 1)" stroke="${type === 'active' ? '#FFFFFF' : '#061230'}" fill="none" fill-rule="evenodd">
        <rect width="11" height="14.143" rx="1.909"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.667 1.958h3.666"/>
        <rect stroke-linecap="round" stroke-linejoin="round" y="3.857" width="11" height="3.857" rx="1.273"/>
        <circle fill="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-linejoin="round" cx="2.444" cy="11.571" r="1"/>
        <circle fill="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-linejoin="round" cx="8.556" cy="11.571" r="1"/>
        <path d="M1.222 17.387h8.556m-1.222-1.316L10.389 18m-7.945-1.929L.611 18" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(13)} height={Metrics.normalize(20)} />;
});

export const Metro = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="13" height="20" viewBox="0 0 13 20">
    <g transform="translate(1 1)" stroke="${type === 'active' ? '#FFFFFF' : '#061230'}" fill="none" fill-rule="evenodd">
        <rect width="11" height="14.143" rx="1.909"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.667 1.958h3.666"/>
        <rect stroke-linecap="round" stroke-linejoin="round" y="3.857" width="11" height="3.857" rx="1.273"/>
        <circle fill="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-linejoin="round" cx="2.444" cy="11.571" r="1"/>
        <circle fill="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-linejoin="round" cx="8.556" cy="11.571" r="1"/>
        <path d="M1.222 17.387h8.556m-1.222-1.316L10.389 18m-7.945-1.929L.611 18" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(13)} height={Metrics.normalize(20)} />;
});

export const Tram = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="13" height="20" viewBox="0 0 13 20">
  <g transform="translate(1 1)" stroke="${type === 'active' ? '#FFFFFF' : '#061230'}" fill="none" fill-rule="evenodd">
      <rect width="11" height="14.143" rx="1.909"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.667 1.958h3.666"/>
      <rect stroke-linecap="round" stroke-linejoin="round" y="3.857" width="11" height="3.857" rx="1.273"/>
      <circle fill="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-linejoin="round" cx="2.444" cy="11.571" r="1"/>
      <circle fill="${type === 'active' ? '#FFFFFF' : '#061230'}" stroke-linejoin="round" cx="8.556" cy="11.571" r="1"/>
      <path d="M1.222 17.387h8.556m-1.222-1.316L10.389 18m-7.945-1.929L.611 18" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(13)} height={Metrics.normalize(20)} />;
});

export const Back = React.memo(() => {
	const xml = `
  <svg width="10" height="18" viewBox="0 0 10 18">
    <path d="M9 17 1 9l8-8" stroke="#FFF" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(10)} height={Metrics.normalize(18)} />;
});

export const Forward = React.memo(() => {
	const xml = `
  <svg width="7" height="12" viewBox="0 0 7 12">
    <path d="m1 1 5 5-5 5" stroke="#061230" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(7)} height={Metrics.normalize(12)} />;
});

export const ChevronLeft = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="7" height="12" viewBox="0 0 7 12">
    <path d="M6 11 1 6l5-5" stroke="${type === 'active' ? Colors.GREEN : Colors.LIGHT_GREY}" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(7)} height={Metrics.normalize(12)} />;
});

export const ChevronRight = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="7" height="12" viewBox="0 0 7 12">
    <path d="m1 1 5 5-5 5" stroke="${type === 'active' ? Colors.GREEN : Colors.LIGHT_GREY}" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(7)} height={Metrics.normalize(12)} />;
});

export const StartPointMarker = React.memo(() => {
	const xml = `
  <svg width="7" height="8" viewBox="0 0 7 8">
    <path d="m.028-.05 6.216 3.996L.028 7.942z" fill="#FFF" fill-rule="evenodd"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(7)} height={Metrics.normalize(12)} />;
});

export const EndPointMarker = React.memo(() => {
	const xml = `
  <svg width="6" height="6" viewBox="0 0 6 6">
    <path d="M0 0h6v6H0z" fill="#FFF" fill-rule="evenodd"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(7)} height={Metrics.normalize(12)} />;
});

export const Message = React.memo(({ type }: IconProps) => {
	let xml = `
  <svg width="20" height="20" viewBox="0 0 20 20" >
    <path d="M2.709 15.365c.051-.19-.063-.453-.171-.643a1.941 1.941 0 0 0-.11-.164A8.646 8.646 0 0 1 1 9.798C.985 4.941 5.012 1 9.993 1c4.343 0 7.969 3.009 8.816 7.003A8.61 8.61 0 0 1 19 9.805c0 4.864-3.872 8.867-8.852 8.867-.792 0-1.861-.199-2.444-.362a16.392 16.392 0 0 1-1.315-.438 1.345 1.345 0 0 0-1.004.016l-2.935 1.06a.692.692 0 0 1-.202.052.415.415 0 0 1-.388-.564l.849-3.07z" stroke="#FFF" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round"/>
  </svg>
  `;
	if (type === 'active') {
		xml = `
    <svg width="20" height="20" viewBox="0 0 20 20" >
      <path d="M2.709 15.365c.051-.19-.063-.453-.171-.643a1.941 1.941 0 0 0-.11-.164A8.646 8.646 0 0 1 1 9.798C.985 4.941 5.012 1 9.993 1c4.343 0 7.969 3.009 8.816 7.003A8.61 8.61 0 0 1 19 9.805c0 4.864-3.872 8.867-8.852 8.867-.792 0-1.861-.199-2.444-.362a16.392 16.392 0 0 1-1.315-.438 1.345 1.345 0 0 0-1.004.016l-2.935 1.06a.692.692 0 0 1-.202.052.415.415 0 0 1-.388-.564l.849-3.07z" fill="#FFF" stroke="#FFF" stroke-width="1.5" fill-rule="evenodd" stroke-linecap="round"/>
    </svg>
    `;
	}

	return <SvgXml xml={xml} width={Metrics.normalize(20)} height={Metrics.normalize(20)} />;
});

export const MessageChevronForward = React.memo(() => {
	const xml = `
  <svg width="7" height="12" viewBox="0 0 7 12" >
    <path d="m1 1 5 5-5 5" stroke="#061230" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(7)} height={Metrics.normalize(12)} />;
});

export const WhiteTrashBin = React.memo(() => {
	const xml = `
  <svg width="22" height="26" viewBox="0 0 22 26">
    <g stroke="#FFF" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round">
      <path d="m2.818 4.692 1.137 18.462C4.009 24.22 4.773 25 5.773 25h10.454c1.004 0 1.754-.78 1.818-1.846l1.137-18.462" stroke-linejoin="round"/>
      <path fill="#FFF" fill-rule="nonzero" d="M1 4.714h20"/>
      <path d="M7.364 4.692V2.385h0c-.001-.368.142-.72.398-.98A1.35 1.35 0 0 1 8.727 1h4.546c.362-.001.71.144.965.404.256.26.4.613.398.98h0v2.308M11.022 8.385v12.923M6.909 8.385l.455 12.923M15.091 8.385l-.455 12.923" stroke-linejoin="round"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(22)} height={Metrics.normalize(26)} />;
});

export const MessageNavigationBack = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="12" height="22" viewBox="0 0 12 22">
    <path d="M11 21 1 11 11 1" stroke=${type === 'active' ? '#061230' : '#C5C8CF'} stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(12)} height={Metrics.normalize(22)} />;
});

export const MessageNavigationForward = React.memo(({ type }: IconProps) => {
	const xml = `
  <svg width="12" height="22" viewBox="0 0 12 22" >
    <path d="m1 1 10 10L1 21" stroke=${type === 'active' ? '#061230' : '#C5C8CF'} stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(12)} height={Metrics.normalize(22)} />;
});

export const BlackTrashBin = React.memo(() => {
	const xml = `
  <svg width="22" height="26" viewBox="0 0 22 26">
    <g stroke="#061230" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round">
      <path d="m2.818 4.692 1.137 18.462C4.009 24.22 4.773 25 5.773 25h10.454c1.004 0 1.754-.78 1.818-1.846l1.137-18.462" stroke-linejoin="round"/>
      <path fill="#061230" fill-rule="nonzero" d="M1 4.714h20"/>
      <path d="M7.364 4.692V2.385h0c-.001-.368.142-.72.398-.98A1.35 1.35 0 0 1 8.727 1h4.546c.362-.001.71.144.965.404.256.26.4.613.398.98h0v2.308M11.022 8.385v12.923M6.909 8.385l.455 12.923M15.091 8.385l-.455 12.923" stroke-linejoin="round"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(22)} height={Metrics.normalize(26)} />;
});

export const TouchIcon = React.memo(() => {
	const xml = `
  <svg width="22" height="27" viewBox="0 0 22 27">
    <g fill="none" fill-rule="evenodd">
      <path d="M11 25.453C17.667 19.5 21 14.682 21 11c0-5.523-4.477-10-10-10S1 5.477 1 11c0 3.682 3.333 8.5 10 14.453z" stroke="#FFF" stroke-width="1.5" fill="#FFF"/>
      <g stroke="#ED4E50" stroke-linecap="round">
        <g stroke-linejoin="round">
          <path d="M15.655 11.87v3.94c0 .94-.76 1.7-1.7 1.7h-3.66c-.02 0-.03 0-.05-.01-.2 0-.39-.08-.55-.24l-3.1-3.1a.832.832 0 0 1-.25-.6c0-.22.08-.43.25-.6.33-.34.87-.34 1.2 0l1.06 1.06V6.98a.85.85 0 1 1 1.7 0v3.67a.85.85 0 1 1 1.7 0v.66a.85.85 0 1 1 1.7 0v.56a.85.85 0 1 1 1.7 0zM10.553 10.622v1.08M12.255 11.267v.434"/>
        </g>
        <path d="M7.405 7.25c-.03-.12-.04-.25-.04-.39 0-1.31 1.06-2.37 2.37-2.37s2.37 1.06 2.37 2.37c0 .14-.01.27-.04.39"/>
      </g>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(22)} height={Metrics.normalize(27)} />;
});

export const PhoneIcon = React.memo(() => {
	const xml = `
  <svg width="22" height="27" viewBox="0 0 22 27">
    <g fill="none" fill-rule="evenodd">
      <path d="M11 25.453C17.667 19.5 21 14.682 21 11c0-5.523-4.477-10-10-10S1 5.477 1 11c0 3.682 3.333 8.5 10 14.453z" fill="#FFF" stroke="#FFF" stroke-width="1.5"/>
      <g stroke="#ED4E50">
        <path d="m15.969 14.958-.776.776c-.411.412-.986.643-1.564.57-1.083-.137-2.27-.597-3.423-1.339a11.737 11.737 0 0 1-1.945-1.576 11.23 11.23 0 0 1-1.583-1.966c-.753-1.17-1.208-2.376-1.33-3.47-.063-.563.162-1.119.562-1.519l.768-.767a1.078 1.078 0 0 1 1.513 0l1.421 1.421a1.07 1.07 0 0 1 0 1.513l-.912.913c.34.707.827 1.393 1.435 2a7.516 7.516 0 0 0 1.98 1.43l.92-.92a1.07 1.07 0 0 1 1.513 0l1.421 1.421a1.073 1.073 0 0 1 0 1.513z"/>
        <path d="M12.55 4.355a4.726 4.726 0 0 1 4.727 4.726M12.012 6.229a3.39 3.39 0 0 1 3.39 3.39" stroke-linecap="round"/>
      </g>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(22)} height={Metrics.normalize(27)} />;
});

export const OrangePin = React.memo(() => {
	const xml = `
  <svg width="24" height="33" viewBox="0 0 24 33">
    <g transform="translate(1 1)" stroke="#FFF" stroke-width=".7" fill="none" fill-rule="evenodd">
      <path d="M11 31c7.333-9.059 11-15.654 11-19.783C22 5.022 17.075 0 11 0S0 5.022 0 11.217C0 15.347 3.667 21.94 11 31z" fill="#F28F40"/>
      <ellipse fill="#FFF" cx="11" cy="11.217" rx="5.5" ry="5.608"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(24)} height={Metrics.normalize(33)} />;
});

export const RedPin = React.memo(() => {
	const xml = `
  <svg width="24" height="33" viewBox="0 0 24 33">
    <g transform="translate(1 1)" stroke="#FFF" stroke-width=".7" fill="none" fill-rule="evenodd">
      <path d="M11 31c7.333-9.059 11-15.654 11-19.783C22 5.022 17.075 0 11 0S0 5.022 0 11.217C0 15.347 3.667 21.94 11 31z" fill="#ED4E50"/>
      <ellipse fill="#FFF" cx="11" cy="11.217" rx="5.5" ry="5.608"/>
    </g>
  </svg>
  `;

	return <SvgXml xml={xml} width={Metrics.normalize(24)} height={Metrics.normalize(33)} />;
});
