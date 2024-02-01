import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('schools.db');

const insertSchool = (school, successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO schools (name, year, description, logo, location, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?);',
            [
                school.name,
                school.year,
                school.description,
                school.logo,
                school.location,
                school.latitude,
                school.longitude,
            ],
            (_, result) => successCallback(result),
            (_, error) => {
                console.error('SQLite Error:', error);
                errorCallback(error);
            }
        );
    });
};

const getSchools = (successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM schools;', [], (_, result) => successCallback(result), (_, error) => errorCallback(error));
    });
};

const getSchoolById = (schoolId, successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM schools WHERE id = ? LIMIT 1;',
            [schoolId],
            (_, result) => successCallback(result),
            (_, error) => errorCallback(error)
        );
    });
}

const updateSchool = (school, successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE schools SET name=?, year=?, description=?, logo=?, location=?, latitude=?, longitude=? WHERE id=?;',
            [
                school.name,
                school.year,
                school.description,
                school.logo,
                school.location,
                school.latitude,
                school.longitude,
                school.id,
            ],
            (_, result) => successCallback(result),
            (_, error) => errorCallback(error)
        );
    });
};

const rateSchool = (school, successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE schools SET rating = (rating * numberOfUserrate + ?) / (numberOfUserrate + 1), numberOfUserrate = numberOfUserrate + 1 WHERE id = ?;',
            [
                school.rating,
                school.id,
            ],
            (_, result) => successCallback(result),
            (_, error) => errorCallback(error)
        );
    });
};


const deleteSchool = (schoolId, successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM schools WHERE id=?;', [schoolId], (_, result) => successCallback(result), (_, error) => errorCallback(error));
    });
};

export const SchoolsCrud = {
    insertSchool,
    getSchools,
    updateSchool,
    deleteSchool,
    rateSchool,
    getSchoolById
};
