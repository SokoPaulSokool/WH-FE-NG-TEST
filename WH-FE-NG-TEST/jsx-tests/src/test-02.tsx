/**
 * In the following React template, modify the component so that the counter correctly displays and it increments by one whenever the button is pressed. 
 * You are free to add classes and styles, but make sure you leave the element ID's as they are.
 */

 import React, {  } from 'react';
 import ReactDOM from 'react-dom';
 
 const style = {
   countText: {
     fontSize: 30,
     color: "white",
     marginLeft: 6,
     borderWidth: 2,
     borderColor: "lightseagreen",
     background: "lightseagreen",
     borderStyle: "solid",
     borderRadius: 6,
     padding: 10,
   },
   paragraph: {
     textAlign: "center",
     display: "flex",
     alignItems: "center",
   },
   counterBtn: {
     marginTop: "10px",
     padding: "10px 15px",
     border: "none",
     backgroundColor: "lightseagreen",
     fontSize: "14px",
     borderRadius: "5px",
   },
 } as const;
 
 class Counter extends React.Component {
   state = { counter: 0 };
   constructor(props) {
     super(props);
   }
 
   handleCounterIncrease = () => {
     this.setState({ counter: this.state.counter + 1 });
   };
 
   render() {
     return (
       <div id="mainArea">
         <p style={style.paragraph}>
           button count:{" "}
           <span style={style.countText}>{this.state.counter}</span>
         </p>
         <button
           id="mainButton"
           onClick={this.handleCounterIncrease}
           style={style.counterBtn}
         >
           Increase
         </button>
       </div>
     );
   }
 }
 
 ReactDOM.render(
   <Counter />,
   document.getElementById('test-02')
 );