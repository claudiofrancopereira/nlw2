import React, { useState, useEffect } from 'react';
import { View,ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles'

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeachersIds);
            };
        });
    };

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView style={styles.teacherList}>
               {favorites.map((teacher: Teacher) => {
                   return (
                       <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                   );
               })}

            </ScrollView>

        </View>
    );
};

export default Favorites;
