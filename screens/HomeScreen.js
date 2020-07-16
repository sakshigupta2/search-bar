import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements'
import MyHeader from '../components/MyHeader';

import db from '../config'

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      allRequests : [],
      searchText: null
    }
  this.requestRef= null
  }

  getAllRequests =()=>{
    this.requestRef = db.collection("exchange_requests")
    .onSnapshot((snapshot)=>{
      var allRequests = []
      snapshot.forEach((doc) => {
          allRequests.push(doc.data())
      })
      this.setState({allRequests:allRequests})
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.username)
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress ={()=>{
               this.props.navigation.navigate("ReceiverDetails",{"details": item})
             ;console.log("this are items ",item.username)}}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  renderHeader = ()=> {
    return (
      <KeyboardAvoidingView>
      <SearchBar placeholder = "Search Here..."
      lightTheme 
      round 
      editable = {true}
      value = {this.state.searchText}
      onChangeText = {this.updateSearch}
      />
      </KeyboardAvoidingView>
    )
  }

  updateSearch = searchText => {
    this.setState({searchText},()=>{
      if('' == searchText){
        this.setState({
          allRequests: [...this.state.allRequests]
        });
        return;
      }
      this.state.allRequests = this.state.allRequests.filter(function(item){
        return item.item_name.includes(searchText);
      }).map(function({item_name, description}){
        return {item_name, description}
      });
    })
  }

  componentDidMount(){
    this.getAllRequests()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Barter App" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allRequests.length === 0
            ?(
              <View style={{flex:1, fontSize: 20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{ fontSize: 20}}>List of all Barter</Text>
              </View>
            )
            :(
              <KeyboardAvoidingView>
              <FlatList
              ListHeaderComponent = {this.renderHeader}
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
              </KeyboardAvoidingView>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#008080",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
