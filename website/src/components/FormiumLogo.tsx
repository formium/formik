import * as React from 'react';

export const FormiumLogo: React.FC<React.JSX.IntrinsicElements['svg']> = props => {
  return (
    <svg
      width={'101px'}
      height="28px"
      viewBox={'0 0 303 84'}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M83.37 59C83.0567 59 82.7747 58.8903 82.524 58.671C82.3047 58.4203 82.195 58.1383 82.195 57.825V27.322C82.195 26.9773 82.3047 26.6953 82.524 26.476C82.7434 26.2253 83.0254 26.1 83.37 26.1H105.225C105.57 26.1 105.852 26.2253 106.071 26.476C106.322 26.6953 106.447 26.9773 106.447 27.322V32.304C106.447 32.6487 106.322 32.9307 106.071 33.15C105.852 33.3693 105.57 33.479 105.225 33.479H90.843V40.012H104.285C104.63 40.012 104.912 40.1373 105.131 40.388C105.382 40.6073 105.507 40.8893 105.507 41.234V46.216C105.507 46.5607 105.382 46.8427 105.131 47.062C104.912 47.2813 104.63 47.391 104.285 47.391H90.843V57.825C90.843 58.1383 90.7334 58.4203 90.514 58.671C90.2947 58.8903 90.0127 59 89.668 59H83.37ZM124.787 59.47C120.338 59.47 116.828 58.389 114.259 56.227C111.69 54.065 110.327 50.8847 110.17 46.686C110.139 45.8087 110.123 44.4613 110.123 42.644C110.123 40.8267 110.139 39.4637 110.17 38.555C110.295 34.419 111.658 31.2387 114.259 29.014C116.891 26.758 120.4 25.63 124.787 25.63C129.142 25.63 132.62 26.758 135.221 29.014C137.853 31.2387 139.232 34.419 139.357 38.555C139.42 40.3723 139.451 41.7353 139.451 42.644C139.451 43.584 139.42 44.9313 139.357 46.686C139.2 50.8847 137.837 54.065 135.268 56.227C132.73 58.389 129.236 59.47 124.787 59.47ZM124.787 52.42C126.416 52.42 127.717 51.9343 128.688 50.963C129.659 49.9603 130.176 48.4407 130.239 46.404C130.302 44.5867 130.333 43.2863 130.333 42.503C130.333 41.7197 130.302 40.4507 130.239 38.696C130.176 36.6593 129.659 35.1553 128.688 34.184C127.717 33.1813 126.416 32.68 124.787 32.68C123.126 32.68 121.81 33.1813 120.839 34.184C119.868 35.1553 119.351 36.6593 119.288 38.696C119.257 39.5733 119.241 40.8423 119.241 42.503C119.241 44.195 119.257 45.4953 119.288 46.404C119.351 48.4407 119.868 49.9603 120.839 50.963C121.81 51.9343 123.126 52.42 124.787 52.42ZM145.93 59C145.616 59 145.334 58.8903 145.084 58.671C144.864 58.4203 144.755 58.1383 144.755 57.825V27.322C144.755 26.9773 144.864 26.6953 145.084 26.476C145.303 26.2253 145.585 26.1 145.93 26.1H158.855C162.991 26.1 166.218 27.04 168.537 28.92C170.887 30.8 172.062 33.4477 172.062 36.863C172.062 39.0563 171.545 40.9207 170.511 42.456C169.508 43.9913 168.114 45.182 166.328 46.028L172.673 57.496C172.767 57.684 172.814 57.8563 172.814 58.013C172.814 58.2637 172.72 58.4987 172.532 58.718C172.344 58.906 172.109 59 171.827 59H165.2C164.291 59 163.649 58.577 163.273 57.731L158.103 47.532H153.591V57.825C153.591 58.1697 153.465 58.4517 153.215 58.671C152.995 58.8903 152.713 59 152.369 59H145.93ZM158.808 40.623C160.155 40.623 161.173 40.294 161.863 39.636C162.583 38.9467 162.944 38.0067 162.944 36.816C162.944 35.6253 162.583 34.6697 161.863 33.949C161.173 33.2283 160.155 32.868 158.808 32.868H153.591V40.623H158.808ZM178.656 59C178.312 59 178.014 58.8903 177.763 58.671C177.544 58.4517 177.434 58.1697 177.434 57.825V27.322C177.434 26.9773 177.544 26.6953 177.763 26.476C178.014 26.2253 178.312 26.1 178.656 26.1H183.967C184.751 26.1 185.315 26.4447 185.659 27.134L193.743 41.61L201.874 27.134C202.219 26.4447 202.783 26.1 203.566 26.1H208.877C209.222 26.1 209.504 26.2253 209.723 26.476C209.974 26.6953 210.099 26.9773 210.099 27.322V57.825C210.099 58.1697 209.974 58.4517 209.723 58.671C209.504 58.8903 209.222 59 208.877 59H202.908C202.595 59 202.313 58.8903 202.062 58.671C201.843 58.4203 201.733 58.1383 201.733 57.825V40.717L196.657 50.023C196.25 50.7437 195.702 51.104 195.012 51.104H192.474C191.848 51.104 191.299 50.7437 190.829 50.023L185.8 40.717V57.825C185.8 58.1697 185.675 58.4517 185.424 58.671C185.205 58.8903 184.923 59 184.578 59H178.656ZM217.669 59C217.356 59 217.074 58.8903 216.823 58.671C216.604 58.4203 216.494 58.1383 216.494 57.825V27.275C216.494 26.9303 216.604 26.6483 216.823 26.429C217.074 26.2097 217.356 26.1 217.669 26.1H224.39C224.735 26.1 225.017 26.2097 225.236 26.429C225.455 26.6483 225.565 26.9303 225.565 27.275V57.825C225.565 58.1383 225.455 58.4203 225.236 58.671C225.017 58.8903 224.735 59 224.39 59H217.669ZM245.921 59.47C241.471 59.47 237.978 58.389 235.44 56.227C232.933 54.065 231.68 50.822 231.68 46.498V27.322C231.68 26.9773 231.789 26.6953 232.009 26.476C232.228 26.2253 232.51 26.1 232.855 26.1H239.294C239.638 26.1 239.92 26.2253 240.14 26.476C240.39 26.6953 240.516 26.9773 240.516 27.322V46.404C240.516 48.3467 240.97 49.8037 241.879 50.775C242.819 51.7463 244.15 52.232 245.874 52.232C247.597 52.232 248.913 51.7463 249.822 50.775C250.762 49.7723 251.232 48.3153 251.232 46.404V27.322C251.232 26.9773 251.341 26.6953 251.561 26.476C251.811 26.2253 252.109 26.1 252.454 26.1H258.846C259.19 26.1 259.472 26.2253 259.692 26.476C259.942 26.6953 260.068 26.9773 260.068 27.322V46.498C260.068 50.822 258.814 54.065 256.308 56.227C253.801 58.389 250.339 59.47 245.921 59.47ZM267.378 59C267.033 59 266.736 58.8903 266.485 58.671C266.266 58.4517 266.156 58.1697 266.156 57.825V27.322C266.156 26.9773 266.266 26.6953 266.485 26.476C266.736 26.2253 267.033 26.1 267.378 26.1H272.689C273.472 26.1 274.036 26.4447 274.381 27.134L282.465 41.61L290.596 27.134C290.941 26.4447 291.505 26.1 292.288 26.1H297.599C297.944 26.1 298.226 26.2253 298.445 26.476C298.696 26.6953 298.821 26.9773 298.821 27.322V57.825C298.821 58.1697 298.696 58.4517 298.445 58.671C298.226 58.8903 297.944 59 297.599 59H291.63C291.317 59 291.035 58.8903 290.784 58.671C290.565 58.4203 290.455 58.1383 290.455 57.825V40.717L285.379 50.023C284.972 50.7437 284.423 51.104 283.734 51.104H281.196C280.569 51.104 280.021 50.7437 279.551 50.023L274.522 40.717V57.825C274.522 58.1697 274.397 58.4517 274.146 58.671C273.927 58.8903 273.645 59 273.3 59H267.378Z"
        fill="currentColor"
      />
      <path
        d="M38.8688 0L48.5628 5.57462L10.3866 27.5283L0.692639 21.9536L38.8688 0Z"
        fill="currentColor"
      />
      <path
        d="M48.9537 6.74507L11.0179 28.5506L11.0166 39.5831L48.9525 17.7776L48.9537 6.74507Z"
        fill="currentColor"
      />
      <path
        d="M33.6985 28.2757L11.0976 41.2669L11.0964 52.2997L33.6972 39.3084L33.6985 28.2757Z"
        fill="currentColor"
      />
      <path
        d="M25.0346 45.7171L11.0441 53.7592L11.0428 64.7922L25.0334 56.7501L25.0346 45.7171Z"
        fill="currentColor"
      />
      <path
        d="M0.00375833 23.0173L9.75474 28.622L9.75099 39.6571L0 34.0525L0.00375833 23.0173Z"
        fill="currentColor"
      />
      <path
        d="M0.0965426 35.6574L9.72924 41.1941L9.72548 52.2292L0.0927843 46.6926L0.0965426 35.6574Z"
        fill="currentColor"
      />
      <path
        d="M0.0922985 48.2214L9.72824 53.76L9.72423 65.523L0.0882924 59.9844L0.0922985 48.2214Z"
        fill="currentColor"
      />
      <path
        d="M21.5645 84L11.8705 78.4254L49.6134 56.7209L59.3073 62.2955L21.5645 84Z"
        fill="currentColor"
      />
      <path
        d="M11.102 77.4713L48.9809 55.6985L48.9821 44.666L11.1032 66.4388L11.102 77.4713Z"
        fill="currentColor"
      />
      <path
        d="M26.3002 55.9735L48.901 42.9822L48.9023 31.9495L26.3014 44.9407L26.3002 55.9735Z"
        fill="currentColor"
      />
      <path
        d="M34.9641 38.532L48.9546 30.4899L48.9558 19.457L34.9653 27.4991L34.9641 38.532Z"
        fill="currentColor"
      />
      <path
        d="M59.9962 61.3058L50.2453 55.7012L50.249 44.666L60 50.2706L59.9962 61.3058Z"
        fill="currentColor"
      />
      <path
        d="M59.9041 48.5947L50.2714 43.058L50.2751 32.0229L59.9078 37.5595L59.9041 48.5947Z"
        fill="currentColor"
      />
      <path
        d="M59.9077 36.0307L50.2717 30.4921L50.2756 18.9405L59.9116 24.479L59.9077 36.0307Z"
        fill="currentColor"
      />
    </svg>
  );
};
