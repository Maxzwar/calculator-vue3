// Lifecycle of user adding two numbers:
// -------------------------------------
// 1. User clicks the '1' button
// append() method called (with number argument equal to the string '1')
//      Note: this.operatorClicked is currently equal to false
//      Note: this.current is currently an empty string
//      if statement in append method evaluates to false, since this.operatorClicked in the state is null. Code inside the if statement is skipped.
//      The next line of append() changes the state of this.current by appending the number on the button to the this.current
//          this.current = `${this.current}${number}`;
//          aka:                  ''     +    '1'
//          To the user, this looks like: //see screenshot of calculator UI with a 1 in the display
//
// 2. User clicks the '+' button, calling the add() method. Note: '@' is shorthand for 'v-on:'
//      this.operator in the state becomes an add function: (a, b) => a + b;
//      setPrevious() gets called. Note: in Vue, all methods on the same component can be called by using 'this.methodIWantToCall()'
//          this.previous in the state becomes '1'.
// 3. User clicks the '2' button
//      Note: this.operatorClicked is currently equal to true
//      Note: this.current is currently '1'
//      Note: this.previous is also currently '1'
//      if statement in append() method evaluates to true, since this.operatorClicked in the state is not null. Code inside the if statement executes.
//          this.current becomes '' again          
//          this.operatorClicked becomes false again, since this.operator in the state already stores the function to add the number the user just clicked to the number they clicked before clicking the '+' button.
//      The next line of the append() method executes, loading '2' into this.current
//
// 4. The user clicks the '=' button, calling the equals() method.
//      this.current becomes the result of the function in this.operator with the arguments parsed from strings to floats.
//          this.current = `float value of string '1' + float value of string '2'`
//                                        1          +          2
//          this.current =               `3`
//              Note: this.current is still a string, since string literals from javascript encapsulated all of the logic in the equals method.
// 5. The display element (see index.html: <div class="display">{{current || '0'}}</div> ) updates to the value of this.current in the state, aka '3'.
//      
//      

const app = Vue.createApp({
    data() {
        return {
        // App state
          previous: null,
          current: '',
          operator: null,
          // Changed by setPrevious() method
          operatorClicked: false,
        }
    },
    methods: {
        clear() {
          this.current = '';
        },
        sign() {
          this.current = this.current.charAt(0) === '-' ? 
            this.current.slice(1) : `-${this.current}`;
        },
        percent() {
          this.current = `${parseFloat(this.current) / 100}`;
        },
        append(number) {
          if (this.operatorClicked) {
            this.current = '';
            this.operatorClicked = false;
          }
          this.current = `${this.current}${number}`;
        },
        dot() {
          if (this.current.indexOf('.') === -1) {
            this.append('.');
          }
        },
        setPrevious() {
          this.previous = this.current;
          this.operatorClicked = true;
        },
        divide() {
          this.operator = (a, b) => a / b;
          this.setPrevious();
        },
        times() {
          this.operator = (a, b) => a * b;
          this.setPrevious();
        },
        minus() {
          this.operator = (a, b) => a - b;
          this.setPrevious();
        },
        add() {
          this.operator = (a, b) => a + b;
          this.setPrevious();
        },
        equal() {
          this.current = `${this.operator(
            parseFloat(this.current), 
            parseFloat(this.previous)
          )}`;
          this.previous = null;
        }
    }
})