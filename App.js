import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './src/camera';
import DetailScreen from './src/detail';
console.disableYellowBox = true;
var Images = [];

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});

var Images = [];
class HomeScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
      var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      this.state = {
      dataSource: dataSource.cloneWithRows(Images)
    }
  }


  loadImageByUri(Uri){
    Images.push(Uri);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(Images)
    })
  }

  renderRow(rowData, sectionID, rowID) {
    
    const { navigate } = this.props.navigation;
 	return (
     <TouchableHighlight 
     underlayColor='#dddddd'
      style={{height:100}}
       onPress = {() => navigate('Details', rowData )}>
        <View>
          <Image
          style={{width: 100, height: 100}}
          source={{uri: rowData}}
        />
        </View>
    	</TouchableHighlight>)}


  render() {
    
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View>
          <Button
            onPress={() => navigate('Camera',{loadImageByUri: this.loadImageByUri.bind(this)} )}
            title="Camera"/>
        </View>
         <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>
      </ListView>
      </ScrollView>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Camera: { screen: CameraScreen },
  Details: { screen: DetailScreen}
});

AppRegistry.registerComponent('Gallery', () => SimpleApp);