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
          [`${+Date.now()}`]: { contentId: +Date.now(), text: 'luh' }
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
    const now = +Date.now()
    var newItem = {
      [now]:
      {
        text: value,
        contentId: [now]
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

  handleEdit(itemId, value) {
    console.error(itemId)
    this.setState({
      items: {...this.state.items, [itemId]: {text: value, contentId: itemId}}
     })
  }
}

const TodoList = ( {items, onDelete, onEdit , value} ) => {
  console.error(items)
  return(
    <ul>
      {Object.keys(items).filter(id => items[id] !== undefined).map(id => {
      return <li key={ items[id].contentId }>
          { items[id].text }
          <EditListItem id={items[id].contentId} value={value} onEdit={onEdit} />
          <button onClick={e => onDelete(items[id].contentId)}> Delete </button>
        </li>
      })}
    </ul>
  )
}

const EditListItem = ( { value, onEdit, id, items} ) => {
  return(
  <div>
    <InputForm  value={value} onSubmit={(value) => onEdit(id, value) } items={items} />
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
      <button> Nanay mo submit </button>
    </form>
  )
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));
