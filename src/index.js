import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      items: {
          [`${+Date.now()}`]: { content_id: +Date.now(), text: 'luh' }
      }
    }
  }


  render(){
    return(
      <div>
        <h3>To Do mo 'to!</h3>
        <TodoList
          items = {this.state.items}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onSubmit={this.handleSubmit}
        />
        <InputForm value={this.state.text} onSubmit={this.handleSubmit} items={this.state.items}/>
      </div>
    );
  }

  handleSubmit(value) {
    var newItem = {
      [`${+Date.now()}`]:
      {
        text: value,
        content_id: +Date.now()
      }
    };
    this.setState({
      items: {...this.state.items, ...newItem}
    });
  }

  handleDelete(itemId) {
    this.setState({
      items: {...this.state.items, [itemId]: undefined}
    })
  }

  handleEdit() {

  }
}

const TodoList = ( {items, onDelete, onSubmit, value} ) => {
  console.error(items)
  return(
    <ul>
      {Object.keys(items).filter(id => items[id] !== undefined).map(id => {
      return <li key={ items[id].content_id }>
          { items[id].text }
          <EditListItem items={items} value={value} onSubmit={onEdit} />
          <button onClick={e => onDelete(items[id])}> Delete </button>
        </li>
      })}
    </ul>
  )
}

const EditListItem = ( { value, onEdit, items} ) => {
  return(
  <div>
    <button >Edit</button>
    <InputForm  value={value} onSubmit={onSubmit} items={items} />
  </div>
  )
}

const InputForm = ( {value, onSubmit, items} ) => {
  let me;
  return(
    <form onSubmit = {e =>{
        e.preventDefault()
        onSubmit(me.value)
        me.value = ''
    }}>
      <input ref={el => me = el}   value={value} required autoFocus />
      <button> {'Lagay mo na to sa #' + (Object.entries(items).length +1)} </button>
    </form>
  )
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));
