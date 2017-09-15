import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      items: {
          [`${+Date.now()}`]: { contentId: +Date.now(), text: 'luh', isHidden: true  }
      }
    }
  }

  toggleHidden(itemId) {
    this.setState({
      items: { ...this.state.items, [itemId]: {contentId: itemId, text: itemId.text, isHidden: false }}
    })
  }

  render(){
    return(
      <div>
        <h3>To Do mo 'to!</h3>
        <TodoList
          toggleHidden = {this.state.toggleHidden}
          items = {this.state.items}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onSubmit={this.handleSubmit}
          toggleHidden = {this.toggleHidden}
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
        contentId: [now],
        isHidden: true
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
      items: {...this.state.items, [itemId]: {text: value, contentId: itemId, isHidden: true}}
     })
  }
}

const TodoList = ( {items, onDelete, onEdit , value, toggleHidden} ) => {
  console.error(items)
  return(
    <ul>
      {Object.keys(items).filter(id => items[id] !== undefined).map(id => {
      return <li key={ items[id].contentId }>
          { items[id].text }
          {items[id].isHidden ?
            <button onClick = { e => toggleHidden(id) }> Edit mo to! </button>
          : <EditListItem id={items[id].contentId} value={value} onEdit={onEdit}  />}
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
      <button> Just do it! </button>
    </form>
  )
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));
