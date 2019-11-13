import React from 'react';

const Logo = props => (
  <svg viewBox="0 0 250 250" fill="none" {...props}>
    <mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={250} height={250}>
      <rect width={250} height={250} rx={125} fill="#C4C4C4" />
    </mask>
    <g mask="url(#prefix__a)">
      <path
        d="M183.588 11.48C166.752 3.479 147.916-1 128.034-1 93.35-1 61.849 12.628 38.594 34.821c-24.724 23.596 188.755-2.54 144.994-23.34z"
        fill="#7CCDE3"
      />
      <path
        d="M229.402 47.727c.148.185-10.568 14.507-42.774 18.573-65.005 8.207-176.608 9.074-176.44 8.705a129.89 129.89 0 0128.551-40.136c14.026 4.38 29.293 5.47 43.733 2.81 23.845-4.363 45.058-18.14 68.644-23.755 10.468-2.515 21.874-3.25 32.616-2.396 17.849 8.484 33.451 20.929 45.67 36.199z"
        fill="#98D5E6"
      />
      <path
        d="M255.962 108.343c.082.522-146.587 14.309-218.048 10.29C14.63 117.324.89 103.247 1.048 102.479a128.596 128.596 0 018.935-27.451c20.645-11.3 44.934-17.822 68.487-17.565 29.535.303 58.51 10.15 88.046 9.416 21.934-.558 44.043-7.559 62.681-19.129 13.735 17.166 23.195 37.901 26.765 60.593z"
        fill="#B4DDE8"
      />
      <path
        d="M257.132 127.91c0 .718-.018 2.15-.018 2.15s-40.737 10.275-93.202 9.662C90.427 138.863-2.002 127.01-2 126.793c.073-8.597.982-16.994 2.652-25.114 17.606 10.863 38.957 16.183 59.508 13.944 16.341-1.771 31.864-7.817 46.998-14.252 15.134-6.436 30.182-13.346 46.179-17.06 23.499-5.442 48.636-3.542 71.101 5.312 10.928 4.31 21.771 10.506 31.111 17.977a130.496 130.496 0 011.583 20.31z"
        fill="#F25192"
      />
      <path
        d="M110.194 170.017c-38.873 7.179-105.585-1.101-105.753-1.613C.261 155.674-2 142.075-2 127.947c0-.373.002-.746.005-1.118 5.901-4.679 12.794-8.852 19.523-12.094 16.644-8.076 35.53-11.445 53.94-9.631 18.196 1.814 35.572 8.551 52.388 15.807 14.167 6.113 28.243 12.717 42.948 17.279 1.441.447-13.819 23.925-56.61 31.827z"
        fill="#D34CA3"
      />
      <path
        d="M252.618 162.852c-2.714 4.584-28.53 20.027-63.525 22.672-46.335 3.502-101.073-10.504-82.915-17.632 28.587-11.229 53.379-31.398 82.915-39.82 22.064-6.321 46.522-5.322 68.182 2.316a129.61 129.61 0 01-4.657 32.464z"
        fill="#9A50A5"
      />
      <path
        d="M240.591 192.573c-22.373 38.843-184.638 48.584-208.343 22.455-12.066-13.3-21.407-29.12-27.139-46.575 19.927-11.389 43.254-16.226 65.675-13.16 29.018 3.973 55.018 20.169 83.648 26.475 23.111 5.096 47.602 3.498 69.85-4.535 10.058-3.659 20.03-8.563 28.849-14.626a128.825 128.825 0 01-12.54 29.966z"
        fill="#96D180"
      />
      <path
        d="M240.058 192.029c-22.326 39.022-64.363 65.317-112.541 65.317-38.065 0-72.296-16.414-96.001-42.551 3.933 1.504 8.333 2.804 12.366 3.94 22.55 6.219 46.825 6.047 69.246-.561 14.359-4.233 27.854-10.971 41.954-16.067 26.904-9.702 56.517-13.118 84.976-10.078z"
        fill="#86AB79"
      />
      <circle cx={107.5} cy={52.5} r={12.5} fill="#1186A6" />
      <circle cx={199.5} cy={125.5} r={12.5} fill="#DD86A9" />
      <circle cx={71.5} cy={189.5} r={12.5} fill="#498333" />
      <path d="M117 61l72 56" stroke="url(#prefix__paint0_linear)" strokeDasharray="5 5" />
      <path d="M83 184l104-52" stroke="url(#prefix__paint1_linear)" strokeDasharray="5 5" />
    </g>
    <defs>
      <linearGradient
        id="prefix__paint0_linear"
        x1={114.636}
        y1={64.838}
        x2={185.883}
        y2={120.432}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#1186A6" />
        <stop offset={1} stopColor="#830E3D" />
      </linearGradient>
      <linearGradient
        id="prefix__paint1_linear"
        x1={85.563}
        y1={187.728}
        x2={188.704}
        y2={136.415}
        gradientUnits="userSpaceOnUse">
        <stop offset={0.004} stopColor="#498333" />
        <stop offset={1} stopColor="#830E3D" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;