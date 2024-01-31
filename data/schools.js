const schoolsData = [
    {
        id: 1,
        name: 'Addis Ketama',
        year: 2000,
        description: 'Addis Ketama is a renowned educational institution in Ethiopia that has been providing quality education for decades. With a commitment to excellence, the school focuses on holistic development, fostering critical thinking, and nurturing a passion for lifelong learning. The dedicated faculty and state-of-the-art facilities make Addis Ketama a preferred choice for students and parents alike. Join us on a journey of academic excellence and personal growth.',
        logo: require('../assets/addis_ketama_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Addis Abeba",
        latitude: 9.03556063665855,
        longitude: 38.733211220922655

    },
    {
        id: 2,
        name: 'Menene',
        year: 2000,
        description: 'Menene High School, established in 2000, is a beacon of educational excellence in Ethiopia. With a rich history and a strong commitment to academic rigor, Menene has consistently produced well-rounded individuals who contribute positively to society. The school\'s ethos revolves around instilling values of integrity, leadership, and community service.Experience a transformative educational journey at Menene High School.',
        logo: require('../assets/menene_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Addis Abeba",
        latitude: 9.051938890547934,
        longitude: 38.759517001555494
    },
    {
        id: 3,
        name: 'Goro High School',
        year: 2000,
        description: 'Goro High School, founded in the year 2000, is synonymous with academic brilliance and character development. The school prides itself on fostering a nurturing environment that encourages intellectual curiosity and a spirit of innovation. Goro High School\'s holistic approach to education ensures that students not only excel academically but also develop essential life skills.Explore the possibilities at Goro High School and prepare for a successful future.',
        logo: require('../assets/goro_high_school_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Adama",
        latitude: 37.78825,
        longitude: -122.4324
    },
    {
        id: 4,
        name: 'Sebeta High School',
        year: 2000,
        description: 'Sebeta High School, with its inception in 2000, stands as a distinguished educational institution in Ethiopia. Committed to providing quality education, the school emphasizes a comprehensive curriculum, cutting-edge teaching methodologies, and a supportive learning environment. Students at Sebeta High School are encouraged to explore their passions, develop critical thinking skills, and become responsible global citizens. Join us on a transformative educational journey at Sebeta High School.',
        logo: require('../assets/sebeta_high_school_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Addis Abeba",
        latitude: 37.78825,
        longitude: -122.4324
    },
    {
        id: 5,
        name: 'Nafyad High School',
        year: 2001,
        description: 'Nafyad High School, with its inception in 2000, stands as a distinguished educational institution in Ethiopia. Committed to providing quality education, the school emphasizes a comprehensive curriculum, cutting-edge teaching methodologies, and a supportive learning environment. Students at Sebeta High School are encouraged to explore their passions, develop critical thinking skills, and become responsible global citizens. Join us on a transformative educational journey at Sebeta High School.',
        logo: require('../assets/sebeta_high_school_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Adama",
        latitude: 37.78825,
        longitude: -122.4324
    },
    {
        id: 6,
        name: 'Addis Ketama',
        year: 2000,
        description: 'Addis Ketama is a renowned educational institution in Ethiopia that has been providing quality education for decades. With a commitment to excellence, the school focuses on holistic development, fostering critical thinking, and nurturing a passion for lifelong learning. The dedicated faculty and state-of-the-art facilities make Addis Ketama a preferred choice for students and parents alike. Join us on a journey of academic excellence and personal growth.',
        logo: require('../assets/addis_ketama_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Addis Abeba",
        latitude: 9.03556063665855,
        longitude: 38.733211220922655

    },
    {
        id: 7,
        name: 'Menene',
        year: 2000,
        description: 'Menene High School, established in 2000, is a beacon of educational excellence in Ethiopia. With a rich history and a strong commitment to academic rigor, Menene has consistently produced well-rounded individuals who contribute positively to society. The school\'s ethos revolves around instilling values of integrity, leadership, and community service.Experience a transformative educational journey at Menene High School.',
        logo: require('../assets/menene_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Addis Abeba",
        latitude: 9.051938890547934,
        longitude: 38.759517001555494
    },
    {
        id: 8,
        name: 'Goro High School',
        year: 2000,
        description: 'Goro High School, founded in the year 2000, is synonymous with academic brilliance and character development. The school prides itself on fostering a nurturing environment that encourages intellectual curiosity and a spirit of innovation. Goro High School\'s holistic approach to education ensures that students not only excel academically but also develop essential life skills.Explore the possibilities at Goro High School and prepare for a successful future.',
        logo: require('../assets/goro_high_school_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Adama",
        latitude: 37.78825,
        longitude: -122.4324
    },
    {
        id: 9,
        name: 'Sebeta High School',
        year: 2000,
        description: 'Sebeta High School, with its inception in 2000, stands as a distinguished educational institution in Ethiopia. Committed to providing quality education, the school emphasizes a comprehensive curriculum, cutting-edge teaching methodologies, and a supportive learning environment. Students at Sebeta High School are encouraged to explore their passions, develop critical thinking skills, and become responsible global citizens. Join us on a transformative educational journey at Sebeta High School.',
        logo: require('../assets/sebeta_high_school_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Addis Abeba",
        latitude: 37.78825,
        longitude: -122.4324
    },
    {
        id: 10,
        name: 'Nafyad High School',
        year: 2001,
        description: 'Nafyad High School, with its inception in 2000, stands as a distinguished educational institution in Ethiopia. Committed to providing quality education, the school emphasizes a comprehensive curriculum, cutting-edge teaching methodologies, and a supportive learning environment. Students at Sebeta High School are encouraged to explore their passions, develop critical thinking skills, and become responsible global citizens. Join us on a transformative educational journey at Sebeta High School.',
        logo: require('../assets/sebeta_high_school_logo.jpg'),
        images: [{ image: require('../assets/menene_logo.jpg') }, { image: require('../assets/menene_logo.jpg'), }],
        location: "Adama",
        latitude: 37.78825,
        longitude: -122.4324
    },
];

export default schoolsData;
