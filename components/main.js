/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Item} from './';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

const RenderPerson = ({data, setVisibleModal, setSinglePerson}) => {
  if (data) {
    const {name, birthYear} = data;
    return (
      <View style={styles.rowFront}>
        <TouchableOpacity
          onPress={() => {
            setSinglePerson(data);
            setVisibleModal(true);
          }}>
          <Item row plain>
            <Text>{`(${birthYear || '-'}) ${name}`}</Text>
          </Item>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};

export const RenderPersons = ({todo, setVisibleModal, setSinglePerson}) => {
  if (todo && todo.length > 0) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={todo}
        renderItem={({item}) => (
          <RenderPerson
            data={item}
            setVisibleModal={setVisibleModal}
            setSinglePerson={setSinglePerson}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  } else {
    return null;
  }
};

const episodeString = int => {
  switch (int) {
    case 1:
      return 'I';
    case 2:
      return 'II';
    case 3:
      return 'III';
    case 4:
      return 'IV';
    case 5:
      return 'V';
    case 6:
      return 'VI';
    case 7:
      return 'VII';
    case 8:
      return 'VII';
    case 9:
      return 'IX';
    default:
      return '-';
  }
};

const RenderMovie = ({data}) => {
  if (data) {
    const {title, episodeId, releaseDate, director} = data;
    return (
      <Item plain style={styles.movieItem}>
        <Item center small>
          <Text style={{fontSize: 18}}>{`Episode ${episodeString(
            episodeId,
          )}`}</Text>
          <Text style={{fontSize: 16}}>{title}</Text>
        </Item>
        <Item small row spaceBetween>
          <Text>Director:</Text>
          <Text>{director}</Text>
        </Item>
        <Item small row spaceBetween>
          <Text>Release:</Text>
          <Text>{dayjs(releaseDate).format('MMM/DD/YYYY')}</Text>
        </Item>
      </Item>
    );
  } else {
    return null;
  }
};

export const RenderMovies = ({movies}) => {
  if (movies && movies.length > 0) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies}
        renderItem={({item}) => <RenderMovie data={item} />}
        keyExtractor={item => item.id}
      />
    );
  } else {
    return null;
  }
};

export const RenderModal = ({visibleModal, setVisibleModal, siglePerson}) => {
  if (visibleModal) {
    return (
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        useNativeDriver={true}
        isVisible={visibleModal}
        containerStyle={styles.containerModal}>
        <Item
          center
          backgroundColor={Colors.lighter}
          style={styles.containerModal}>
          <Item style={styles.titleModal}>
            <Text style={{fontSize: 20}}>{siglePerson.name}</Text>
          </Item>
          <Item small>
            <Item small>
              <Text>{`Gender: ${siglePerson.gender}`}</Text>
            </Item>
            <Item small>
              <Text>{`Birth Year: ${siglePerson.birthYear || '-'}`}</Text>
            </Item>
            <Item small>
              <Text>{`Height: ${siglePerson.height}`}</Text>
            </Item>
            <Item small>
              <Text>{`Hair Color: ${
                !siglePerson.hairColor
                  ? '-'
                  : siglePerson.hairColor.map(hair => {
                      return hair;
                    })
              }`}</Text>
            </Item>
          </Item>
          <Item center height={'50%'}>
            <Item style={styles.movieItem}>
              <Text>Movies</Text>
            </Item>
            <RenderMovies movies={siglePerson.films} />
          </Item>
          <Item />
          <Item plain style={styles.containerBtnModal}>
            <Item small center>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={() => setVisibleModal(false)}>
                <Item
                  small
                  center
                  backgroundColor={'#3bb79f'}
                  borderRadius={16}>
                  <Text style={styles.backTextWhite}>Close</Text>
                </Item>
              </TouchableOpacity>
            </Item>
          </Item>
        </Item>
      </Modal>
    );
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  textInputContainer: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#3bb79f',
    paddingBottom: 0,
  },
  containerModal: {
    height: '90%',
    borderRadius: 12,
  },
  containerBtnModal: {
    position: 'absolute',
    bottom: 20,
    width: '50%',
  },
  btnModal: {
    width: '40%',
  },
  rowFront: {
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 32,
  },
  movieItem: {
    marginVertical: 8,
    paddingHorizontal: 8,
    borderBottomColor: '#3f3f3f',
    borderBottomWidth: 2,
  },
  rowBack: {
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    height: 32,
  },
  backRightBtnLeft: {
    backgroundColor: '#3bb79f',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  errorMessageText: {
    color: 'red',
    fontSize: 12,
  },
  checkIcon: {
    marginRight: 4,
  },
  syncText: {
    fontSize: 16,
    color: '#3bb79f',
  },
});
