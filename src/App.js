import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [title, setTitle] = useState('')
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  console.log('render')

  useEffect(() => {
    console.log('effect fired')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters)

    console.log('effect is firing')
  }, [monsters, searchField])


  const onSearchChange = (event) => {
    console.log(searchField)
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }

  const onTitleChange = (event) => {
    console.log(title)
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setTitle(searchFieldString)
  }

  console.log(filteredMonsters)

  return (
    <div className="App">
      <h1 className='app-title'>{title}</h1>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <br/>
      <SearchBox
        className='monsters-title-box'
        onChangeHandler={onTitleChange}
        placeholder='set title'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;

