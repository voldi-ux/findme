

import style,{css} from 'styled-components'


const getSpinnerSize = props =>  {
    const style = css`
  height:${props.height}
  `
  return style
}
  

export const SpinnerWrapper = style.div`
text-align:center
width: 100% !important;
display: flex;
justify-content: center;
align-items: center;
${getSpinnerSize}
`

export const Spinner = style.span`
display: inline-block;
width: 50px;
height: 50px;
border: 3px solid rgba(195, 195, 195, 0.6);
border-radius: 50%;
border-top-color: #636767;
animation: spin 1s ease-in-out infinite;
-webkit-animation: spin 1s ease-in-out infinite;
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
`