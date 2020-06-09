import React from 'react';
import {    View,
            Text,
            StyleSheet,
            TouchableOpacity,
            Image, 
            Alert,
            Picker } from 'react-native';
import { Icon } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import MainButton from '../mainbutton';
import server from '../../server';

import { Actions } from 'react-native-router-flux';


export default class HomeUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inState: 0,
            shipSelect: '',
            requestDesc: 'none',
            requestType: 0,
            userid: '',
            shipList: '',

            latitude: null,
            longitude: null,

            ready:false,
            isLoading: true,
        }

    }

    async getToken(user) {
        let geoOptions = { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
        Geolocation.getCurrentPosition(this.geoSucess,this.geoFailure,geoOptions);
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = JSON.parse(userData);
          this.setState({
                userid: data.rows[0][0],
                ready:true
            })
        } catch (error) {
          console.log("Something went wrong", error);
        }
    }

    componentDidMount() {

        this.getToken().then(() => 
            fetch(server.sv +'/yachtlist', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.state.userid,
                }),
            })
            .then( (response) => response.json() )
            .then( (responseJson) => {
                this.setState({
                    shipList: responseJson.rows,
                    shipSelect: responseJson.rows[0][0],
                    isLoading: false,
                })
                console.log(this.state.shipList)
                
            })
            .catch((error) => {
                    console.log(error)
            })
        )
    }

    geoSucess = (position) => {
        this.setState({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            ready:true,
        })
    }
    geoFailure = (err) => {
        this.setState({error: err.message})
    }

    goRequestList() {
        Actions.requestuser();
    }

    Request() {
        this.setState({
            inState: 1,
        }) }

    Back() {
        this.setState({
            inState: 0,
        }) }

    SendRequest() {

        //Alert.alert(this.state.shipSelect.toString())
        fetch(server.sv + '/servicerequest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coordx: this.state.latitude,
                coordy: this.state.longitude,
                ship: this.state.shipSelect,
                requestDesc: this.state.requestDesc,
                requestType: this.state.requestType,
                userid: this.state.userid,
            }),
        })
        .then( (response) => {
            if(response.status == 201) {
                this.setState({
                    inState:2
                })
            } else {
                Alert.alert ('An uknown error')
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }


    render() {
        if(this.state.ready == true && this.state.isLoading == false) {

            let Options = this.state.shipList.map((val,) => {
                return (
                    <Picker.Item label={val[3]} value={val[0]} />
                  )
            });

            return (
                <View style={styles.container}>
                    <View style={styles.index}>
                        <MainButton/>
                        
                    </View>
                    <View style={styles.main}>
                        
                        
                        {this.state.inState == 0 &&
                            <View style={styles.fixedView}>
                                <TouchableOpacity 
                                    style= {styles.button1} onPress={() => this.Request()}>
                                    <Image style= {styles.Image}
                                    source={require('../img/logo.png')}  />
                                </TouchableOpacity>
                                <TouchableOpacity style= {styles.button2} onPress={() => this.goRequestList()}>
                                    <Icon name='center-focus-strong'
                                        size={50}
                                        color={'#FFFFFF'} />
                                </TouchableOpacity> 
                            </View> 
                        }
    
                        {this.state.inState == 1 &&
                            <View style={styles.fixedView2}>
    
                                <TouchableOpacity style={styles.backButton}  onPress={() => this.Back()}>
                                    <Icon name='arrow-back'
                                            size={35}
                                            color={'#FFFFFF'} />
                                </TouchableOpacity>
    
                                <View style={styles.Picker}> 
                                    <Picker
                                    selectedValue={this.state.shipSelect}
                                    style={{fontSize:16,fontWeight:'bold',color:'#FFFFFF'}}
                                    onValueChange={(itemValue, itemIndex) =>
                                    this.setState({shipSelect: itemValue})
                                    }>
                                        {Options}
                                    </Picker>
                                </View>
    
                                <TextInput style= {styles.inputText} placeholder='Request description' placeholderTextColor='#FFFFFF' 
                                    selectionColor="#ffffff" onChangeText={(requestDesc) => this.setState({requestDesc})} multiline={true}/>
    
                                <View style={styles.Picker}> 
                                    <Picker
                                    selectedValue={this.state.requestType}
                                    style={{fontSize:16,fontWeight:'bold',color:'#FFFFFF'}}
                                    onValueChange={(itemValue, itemIndex) =>
                                    this.setState({requestType: itemValue})
                                    }>
                                        <Picker.Item label="Propulsion/fuel" value={0} />
                                        <Picker.Item label="Wings" value={1} />
                                        <Picker.Item label="Electric/generator" value={2} />
                                        <Picker.Item label="Navigation/Anchor" value={3} />
                                        <Picker.Item label="Colision/Standred" value={4} />
                                        <Picker.Item label="Driver supplies" value={5} />
                                        <Picker.Item label="Other" value={6} />
                                    </Picker>
                                </View>
    
                                <TouchableOpacity style= {styles.sendButton} onPress={() => this.SendRequest()}>
                                    <Icon name='center-focus-strong'
                                        size={30}
                                        color={'#FFFFFF'} />
                                    <Text style={{fontSize:18,fontWeight:'bold',justifyContent: 'center', color: '#FFFFFF'}}> Send request</Text>
                                </TouchableOpacity> 
                            </View> 
                        }

                        {this.state.inState == 2 &&
                            <View style={styles.fixedView2}>
                                <View style={styles.requestMessage}>
                                    <Text style={{color:"#FFFFFF", fontSize: 20, fontWeight: 'bold'}}>patience,{"\n"}
                                    Now wait for a worker to answer your request...</Text>
                                </View>   
                            </View>
                        }
                            
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.index}>
                        <MainButton/>
                        
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.textNo}>You must add an yacht in 'fleet' section of sidebar</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    fixedView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    fixedView2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    Image: {
        width:50,
        height:50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical:4
    },
    Icon: {
        width: 10,
        color: '#FFFFFF',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical:4
    },
    Picker: {
        height: 60, 
        width: 200,
        backgroundColor: '#4a77bd',
        borderRadius:20,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        marginVertical:10
    },
    inputText: {
        height: 100, 
        width: 300,
        backgroundColor: '#4a77bd',
        color: '#FFFFFF',
        borderRadius:20,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    sendButton: {
        backgroundColor: '#58a5f0',
        borderRadius:5,
        padding:10,
        paddingRight:12,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    backButton: {
        marginRight: 80,
        width: 50,
        borderRadius: 5,
        backgroundColor: '#58a5f0',
        
    },
    button1: {
        width:80,
        height:60,
        backgroundColor: '#4a77bd',
        borderRadius:5,
        alignSelf: 'center',
    },
    button2: {
        width:80,
        height:60,
        backgroundColor: '#58a5f0',
        borderRadius:5,
        alignContent: 'flex-end',
        justifyContent: 'center',
        marginLeft:5
    },
    TecnicIcon: {
        backgroundColor: '#004c8c',
        justifyContent: 'center'
    },
    requestMessage: {
        backgroundColor: '#58a5f0',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        borderRadius: 10
    },
    Input: {
        backgroundColor: '#007ac1',
        width: 250,
        height: 40,
        borderRadius: 5,
    },
    textNo: {
        alignSelf: 'center',
        paddingTop:100,
        color: '#f50057',
        fontWeight: 'bold',
        backgroundColor: '#aeaeae'
    }
})