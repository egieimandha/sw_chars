import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Section, Item, RenderIf} from './components';
import FlashMessage from 'react-native-flash-message';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');
import {RenderPersons, RenderModal} from './components/main';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import CASTS from './gql/casts';

function App(props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [siglePerson, setSinglePerson] = useState();
  const {loading, data} = useQuery(CASTS);

  return (
    <Item plain backgroundColor={'#fafafa'} height={'100%'}>
      <FlashMessage position="bottom" />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Item header backgroundColor={'#fff'}>
          <Text style={styles.headerText}>{'Star Wars Characters'}</Text>
        </Item>
        <Item plain>
          <RenderIf condition={!loading}>
            <Section>
              <RenderPersons
                todo={data && data.allPersons}
                setVisibleModal={setVisibleModal}
                setSinglePerson={setSinglePerson}
              />
            </Section>
          </RenderIf>
          <RenderIf condition={loading}>
            <Item center>
              <ActivityIndicator size="large" color="#3bb79f" />
            </Item>
          </RenderIf>
        </Item>
      </SafeAreaView>
      <RenderModal
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        siglePerson={siglePerson}
      />
    </Item>
  );
}

const styles = StyleSheet.create({
  btnAddPosition: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  btnUploadPosition: {
    borderWidth: 1,
    borderColor: '#3bb79f',
    borderRadius: 8,
    position: 'absolute',
    top: 14,
    right: 20,
  },
  btnLogoutPosition: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  lastUpdateText: {
    fontSize: 10,
    color: '#606266',
  },
  containerBtnUpload: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/swapi',
});

function root(props) {
  return (
    <ApolloProvider client={client}>
      <App props={props} />
    </ApolloProvider>
  );
}

export default root;
