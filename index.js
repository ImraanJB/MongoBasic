const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.error('Could not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type:Date , default: Date.now },
    isPublished : Boolean
});

const Course = mongoose.model('Course' , courseSchema );

async function createCourse() {
    //To create models in the db
const course = new Course({
    name : 'Angular Course',
    author : 'MOSH',
    tags: ['Angular', 'frontend'],
    isPublished : true
});

const result = await course.save();
console.log(result);
}

// createCourse();

async function getCourses() {
    //To Get models from DB
    // Diiferent Comparison query operators of Mongo/Mongoose
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in) 

    // Logical Opereators
    //or
    //and

    const courses = await Course
    //find({ author:'MOSH', isPublished:true })
    // Comparison Operators
    //.find({ price :{ $gte: 10 , $lte:20 }})
    //.find({ price :{ $in: [10,15,20] }})
    // Logical Operators
    // .find()
    // .or([{author:'MOSH'},{isPublished:true}])
    // Regular Expression
    // Starts with Mosh : Use ^
    .find({ author: /^Mosh/ })
    // Ends with Hamedani : Use $ i for Case Insensitive
    .find({ author: /Hamedani$/i })
    // Contains Mosh Anywhere
    .find({ author: /.*Mosh.*/i })
    .limit(10)
    .sort({ name:1 })
    .select({ name:1, tags:1 })
    // To get the number of documents.
    .count();
    console.log(courses);
}

getCourses();