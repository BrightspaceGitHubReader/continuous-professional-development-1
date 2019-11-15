import { css } from 'lit-element/lit-element';

export const selectStyles = css`
	select {
		border-radius: 0.3rem;
		border-style: solid;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: inline-block;
		height: auto;
		margin: 0;
		vertical-align: middle;
		width: 100%;
		-webkit-transition-duration: 0.5s;
		transition-duration: 0.5s;
		-webkit-transition-timing-function: ease;
		transition-timing-function: ease;
		-webkit-transition-property: background-color, border-color;
		transition-property: background-color, border-color;
		color: #565a5c;
		font-family: inherit;
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.02rem;
		line-height: 1.2rem;
	}
	select::-webkit-input-placeholder {
		color: #d3d9e3;
	}
	select::-moz-placeholder {
		color: #d3d9e3;
	}
	select:-ms-input-placeholder {
		color: #d3d9e3;
	}
	select::placeholder {
		color: #d3d9e3;
	}
	select,
	select:hover:disabled {
		background-color: #fff;
		border-color: #d3d9e3;
		border-width: 1px;
		-webkit-box-shadow: inset 0 2px 0 0 rgba(185, 194, 208, 0.2);
		box-shadow: inset 0 2px 0 0 rgba(185, 194, 208, 0.2);
		padding: 0.4rem 0.75rem;
	}
	select:hover,
	select:focus,
	select.vui-input-focus {
		border-color: #006fbf;
		border-width: 2px;
		outline-width: 0;
		padding: calc(0.4rem - 1px) calc(0.75rem - 1px);
	}
	select[aria-invalid='true'] {
		border-color: #cd2026;
	}
	select:disabled {
		opacity: 0.5;
	}
	select::-webkit-search-cancel-button {
		display: none;
	}
	select::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	select option {
		font-weight: 400;
	}
	@media screen and (-webkit-min-device-pixel-ratio: 0),
	screen and (min--moz-device-pixel-ratio: 0),
	screen and (-ms-high-contrast: active),
	(-ms-high-contrast: none) {
		select:not([multiple]) {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			background-position: right center;
			background-repeat: no-repeat;
			background-size: contain;
			max-height: calc(2rem + 2px);
		}
		select:not([multiple]):focus,
		select:not([multiple]):hover,
		select:not([multiple]).vui-input-hover,
		select:not([multiple]).vui-input-focus {
			background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2242%22%20height%3D%2242%22%20viewBox%3D%220%200%2042%2042%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%23e6eaf0%22%20d%3D%22M0%200h42v42H0z%22%2F%3E%3Cpath%20stroke%3D%22%23d3d9e3%22%20d%3D%22M0%200v42%22%2F%3E%3Cpath%20d%3D%22M14.99%2019.582l4.95%204.95a1.5%201.5%200%200%200%202.122%200l4.95-4.95a1.5%201.5%200%200%200-2.122-2.122L21%2021.35l-3.888-3.89a1.5%201.5%200%200%200-2.12%202.122z%22%20fill%3D%22%23565A5C%22%2F%3E%3C%2Fsvg%3E");
			padding-right: calc(0.75rem + 42px - 1px);
		}
		select:not([multiple]):focus::-ms-value,
		select:not([multiple]):hover::-ms-value,
		select:not([multiple]).vui-input-hover::-ms-value,
		select:not([multiple]).vui-input-focus::-ms-value {
			background-color: transparent;
			color: #565a5c;
		}
		select:not([multiple]),
		select:not([multiple]):disabled,
		select:not([multiple]):focus:disabled,
		select:not([multiple]):hover:disabled {
			background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2242%22%20height%3D%2242%22%20viewBox%3D%220%200%2042%2042%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%23f2f3f5%22%20d%3D%22M0%200h42v42H0z%22%2F%3E%3Cpath%20stroke%3D%22%23d3d9e3%22%20d%3D%22M0%200v42%22%2F%3E%3Cpath%20d%3D%22M14.99%2019.582l4.95%204.95a1.5%201.5%200%200%200%202.122%200l4.95-4.95a1.5%201.5%200%200%200-2.122-2.122L21%2021.35l-3.888-3.89a1.5%201.5%200%200%200-2.12%202.122z%22%20fill%3D%22%23565A5C%22%2F%3E%3C%2Fsvg%3E");
			padding-right: calc(0.75rem + 42px);
		}
		[dir='rtl'] select:not([multiple]) {
			background-position: left center;
		}
		[dir='rtl'] select:not([multiple]):focus,
		[dir='rtl'] select:not([multiple]):hover,
		[dir='rtl'] select:not([multiple]).vui-input-hover,
		[dir='rtl'] select:not([multiple]).vui-input-focus {
			background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2242%22%20height%3D%2242%22%20viewBox%3D%220%200%2042%2042%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%23e6eaf0%22%20d%3D%22M0%200h42v42H0z%22%2F%3E%3Cpath%20stroke%3D%22%23d3d9e3%22%20d%3D%22M42%200v42%22%2F%3E%3Cpath%20d%3D%22M14.99%2019.582l4.95%204.95a1.5%201.5%200%200%200%202.122%200l4.95-4.95a1.5%201.5%200%200%200-2.122-2.122L21%2021.35l-3.888-3.89a1.5%201.5%200%200%200-2.12%202.122z%22%20fill%3D%22%23565A5C%22%2F%3E%3C%2Fsvg%3E");
			padding-left: calc(0.75rem + 42px - 1px);
			padding-right: calc(0.75rem - 1px);
		}
		[dir='rtl'] select:not([multiple]),
		[dir='rtl'] select:not([multiple]):disabled,
		[dir='rtl'] select:not([multiple]):focus:disabled,
		[dir='rtl'] select:not([multiple]):hover:disabled {
			background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2242%22%20height%3D%2242%22%20viewBox%3D%220%200%2042%2042%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%23f2f3f5%22%20d%3D%22M0%200h42v42H0z%22%2F%3E%3Cpath%20stroke%3D%22%23d3d9e3%22%20d%3D%22M42%200v42%22%2F%3E%3Cpath%20d%3D%22M14.99%2019.582l4.95%204.95a1.5%201.5%200%200%200%202.122%200l4.95-4.95a1.5%201.5%200%200%200-2.122-2.122L21%2021.35l-3.888-3.89a1.5%201.5%200%200%200-2.12%202.122z%22%20fill%3D%22%23565A5C%22%2F%3E%3C%2Fsvg%3E");
			padding-right: 0.75rem;
			padding-left: calc(0.75rem + 42px);
		}
		select::-ms-expand {
			display: none;
		}
	}
`;
