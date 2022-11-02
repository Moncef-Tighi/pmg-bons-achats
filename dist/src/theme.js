import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        "light":"rgba(248, 181, 183, 1)"
        ,"main":"rgba(233, 33, 41, 1)"
        ,"dark":"rgba(223, 22, 29, 1)"
        ,"contrastText":"#fff"
      },
      primaryLighter : {
        main : "#EE585D"
        ,"contrastText":"#fff"
      },
      blue : {
        main : "#2129E9"
        ,"contrastText":"#fff"
      }
    },
  });

// const theme = createTheme({"palette":{"common":{"black":"rgba(0, 0, 0, 1)","white":"#fff"},"background":{"paper":"rgba(255, 255, 255, 1)","default":"rgba(229, 229, 229, 1)"},"primary":{"light":"rgba(248, 181, 183, 1)","main":"rgba(233, 33, 41, 1)","dark":"rgba(223, 22, 29, 1)","contrastText":"#fff"},"secondary":{"light":"rgba(238, 149, 0, 1)","main":"rgba(79, 161, 255, 1)","dark":"rgba(0, 155, 41, 1)","contrastText":"rgba(0, 0, 0, 1)"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(105, 105, 105, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","hint":"rgba(0, 0, 0, 0.38)"}}})
export default theme