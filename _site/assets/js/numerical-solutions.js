class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    render() {
      return (
        <div>
          <h3>TODO</h3>
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              What needs to be done?
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add #{this.state.items.length + 1}
            </button>
          </form>
        </div>
      );
    }
  
    handleChange(event) {
      this.setState({ text: event.target.value });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
}
  
class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}
  
ReactDOM.render(<TodoApp />, document.getElementById('test'));

$(document).ready(function(){

});

// start react section

function MathDisplay(props) { // katex to string
  var math = katex.renderToString(props.data, {
      throwOnError: false,
      displayMode: true
  });
  return <p dangerouslySetInnerHTML={ {__html: math} }/>;
}

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {select: ""};
  }

  render () {
      let rows = [];
      rows.push(<h2 key={-1}>Factors</h2>);
      for (let i = 0; i < factors.length - 1; i++) {
          switch (i) {
              case 0: rows.push(<h3 key={i+100}>Single Payments</h3>); break;
              case 2: rows.push(<h3 key={i+100}>Uniform Payment Series</h3>); break;
              case 6: rows.push(<h3 key={i+100}>Arithmetic Gradient</h3>); break;
          }
          rows.push(<button key={i} name={i} onClick={e => this.handleSelect(e, "name")} className="factor">{factors[i].name}</button>);      
      }
      return (
          <div>
              <div className="center">{rows}</div>
              <CalculationIO />
          </div>
      );
  }

  
  handleSelect(e) {
      const target = event.target;
      const value = target.name;
      console.log(value);
      const name = target.name;

      selectedFactor = value;
      // this.setState({select: parseFloat(value)}, () => {
      //     //console.log({Amount: this.state.amount, Rate:this.state.rate, Period: this.state.period});
      //     //this.calcFactor();
      // });
  }
}

ReactDOM.render(<App />, document.getElementById("calculation-type"));

class CalculationIO extends React.Component {
  constructor(props) {
      super(props);
      this.state = {amount: 0, rate: 0, period: 0, tex: ""};
  }

  render () {
      return (
          <form>
              <h2>Input</h2>
              <h3>Calculating Nothing</h3>
              <div className="center">
                  <label className="amount-label" htmlFor="amount">?</label><br />
                  <input className="amount" name="amount" type="number" onChange={this.handleInputChange} value={this.state.amount} placeholder="Amount" /><br />
                  <label htmlFor="rate">Rate</label><br />
                  <input id="rate" name="rate" type="number" onChange={this.handleInputChange} value={this.state.rate} placeholder="Rate" /><br />
                  <label htmlFor="period">Period</label><br />
                  <input id="period" name="period" type="number" onChange={this.handleInputChange} value={this.state.period} placeholder="Period" /><br />

                  <button className="submit">Update</button>  
              </div>

              <h2 className="output-header">Output</h2>
              <MathDisplay className="output center" data={this.state.tex} />
          </form>   
      );
  }
  
  componentDidMount() {
      this.calcFactor();
  }

  handleInputChange = (e) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({[name]: parseFloat(value)}, () => {
          console.log({Amount: this.state.amount, Rate:this.state.rate, Period: this.state.period});
          this.calcFactor();
      });
  }

  calcFactor = () => {
      const {amount, rate, period} = this.state;

      let factor = factors[selectedFactor].eval(rate, period);

      console.log(rate, amount, period, factor);

      let ans = amount*factor;

      factor = precise(factor, 8);
      ans = financial(ans);

      const obj = factors[selectedFactor];
      const {given, ungiven} = factors[selectedFactor];

      this.setState({tex: `\\begin{aligned}${ungiven}&=${given}${obj.formatted("i", "n")}\\\\&=${amount}${obj.formatted(rate, period)}\\\\&=${amount}(${factor})\\\\&=${ans}\\end{aligned}`});   
  }
}

//ReactDOM.render(<CalculationIO />, document.getElementById("calculation-IO"));