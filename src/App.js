import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repositories, setRepos] = useState([]);

  useEffect(()=>{
    api.get("/repositories").then(response =>{
      console.log(response.data);
      setRepos(response.data);
    })
  },[]);


  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    if(response.status === 200){
      const newRepo = [  ...repositories ]

      const repoIndex = repositories.findIndex(repo => repo.id === id);

      newRepo[repoIndex].likes++;

      setRepos(newRepo);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={({item: repo})=> {
              return (
                <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repo.title}</Text>
              
                <View style={styles.techsContainer}>
                  <FlatList
                    data={repo.techs}
                    keyExtractor={ (item, index) => index}
                    renderItem={(item)=>{
                      <Text style={styles.tech} >
                       
                        {item}  
                      </Text>
                    }}
                  />

                  <Text style={styles.tech}>
                      {repo.techs}
                  </Text>
                  
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repo.id}`}
                  >
                    {repo.likes} curtidas
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repo.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repo.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
              );
          }}
        />
      
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 10
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 10
  },
});
