import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {items: [], text: ''};
  }

  render(){
    return(
      <div>
        <h3>To Do mo 'to!</h3>
        <TodoList items = {this.state.items} onDelete = {this.handleDelete}/>
        <form onSubmit = {this.handleSubmit}>
          <input onChange = {this.handleChange} value = {this.state.text} required = {true} />
          <button> {'Add #' + (this.state.items.length +1)} </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

  handleDelete(itemId) {
    let newItems = this.state.items;
    let itemIndex = newItems.map(function(item) {return item.id}).indexOf(itemId)
    newItems.splice(itemIndex, 1)
    this.setState({
      items: newItems
    })
  }

  handleEdit() {

  }
}

const TodoList = ({items, onDelete}) => {
  return(
    <ul>
      {items.map(item =>(
      <li key={item.id}> {item.text} <EditListItem/><button onClick = {e => {e.preventDefault(); onDelete(item.id)}}> Delete </button></li>
      ))}
    </ul>
  )
}

const EditListItem = () => {
  return <button>Edit</button>
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));
