import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import api from './api'
import {ChakraProvider, HStack, VStack, Image, Text, Box, SimpleGrid, Button, Icon, Heading} from '@chakra-ui/react'
interface ICharacter {
  name: string;
  image: string;
  house:"Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw";
}

const IndexPage = () => {

  const [characters, setCharacter] = useState<ICharacter[]>([]);

  const [selectedHouses, setSelectedHouses] = useState('');

  const houses = [
    {
    label: "Gryffindor",
    value:"gryffindor",
    },
    {
    label: "Slytherin",
    value:"slytherin",
    },
    {
      label: "Hufflepuff",
      value:"hufflepuff",
    },
    {
    label: "Ravenclaw",
    value:"ravenclaw",
      },
]

  
  useEffect(() => {
    api.get('characters').then(response => {
      console.log(response);

      const filteredCharacters = response.data.map((character: any) => ({
        name: character.name,
        image: character.image,
        house: character.house,
      }))
      setCharacter(filteredCharacters)
    })
  }, [])

  useEffect(() => {
    if(selectedHouses.length){
      api.get(`characters/house/${selectedHouses}`).then(response => {
        console.log(response);
  
        const filteredCharacters = response.data.map((character: any) => ({
          name: character.name,
          image: character.image,
          house: character.house,
        }))
        setCharacter(filteredCharacters)
      })
    }
   
  }, [selectedHouses])


  const getColorByHouse =(house: "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw") => {
    switch (house) {
      
      case 'Gryffindor':
        return'#600001'
        case 'Slytherin':
          return '#2E7019'
        case 'Hufflepuff':
          return '#F49809'
        case 'Ravenclaw':
          return  '#193753'
        break;

        default:
        return 'black'
    }
  }

  return (
  <ChakraProvider>
    <HStack justify="center">
      <Heading> HOGWARTS HOUSES </Heading>
    </HStack>
  <VStack w="full">

  <HStack w="full"justify="center" align="center">
  <Button onClick={() => setSelectedHouses('gryffindor')} w="200px" h="200px" colorScheme="gost">
     <Image src="http://clipart-library.com/images_k/hogwarts-crest-silhouette/hogwarts-crest-silhouette-25.png" w="120px" ></Image>
     </Button>
     <Button onClick={() => setSelectedHouses('ravenclaw')} w="200px" h="200px" colorScheme="gost">
     <Image src="http://clipart-library.com/images_k/hogwarts-crest-silhouette/hogwarts-crest-silhouette-4.png" w="120px" ></Image>
     </Button>
     <Button onClick={() => setSelectedHouses('hufflepuff')} w="200px" h="200px" colorScheme="gost">
     <Image src="http://clipart-library.com/images_k/hogwarts-crest-silhouette/hogwarts-crest-silhouette-13.png" w="120px" ></Image>
     </Button>
     <Button onClick={() => setSelectedHouses('slytherin')} w="200px" h="200px" colorScheme="gost">
     <Image src="http://clipart-library.com/images_k/hogwarts-crest-silhouette/hogwarts-crest-silhouette-17.png" w="200px" ></Image>
     </Button>
    
     </HStack>
     <SimpleGrid columns={[2, 1,3]} gap={6}>
       {characters.map((character) =>
       <VStack w="250px"
       h="200px"
       p="16px"
       borderWidth="1px"
       borderRadius="8px"
       >

       <Image src={character.image} w="60px" h="60px" borderRadius="50%" objectFit="cover" border="3px solid" borderColor={getColorByHouse(character.house)}/>
        <VStack justify="center" align="center">
          <Heading size="md">{character.name} </Heading>
          <Text color={getColorByHouse(character.house)}> {character.house}</Text>
        </VStack>
      
     </VStack> )}
       
     </SimpleGrid>
  </VStack>

  </ChakraProvider>
  );
};

export default IndexPage;
