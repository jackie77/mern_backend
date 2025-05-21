import mongoose from 'mongoose';

const daggerSchema = new mongoose.Schema({
    loanAmount:{
        type: Number,
        required: true
    },
    loanTermYears:{
        type: Number,
        required: true
    },
    annualInterestRate:{
        type: Number,
        required: true
    },
    monthlyPI:{
        type: Number,
        required: true
    },
    totalInterest:{
        type: Number,
        required: true
    },
    totalPayment:{
        type: Number,
        required: true
    },
},{
    timestamps: true  // createdAt, updatedAt
})

const Dagger = mongoose.model('Dagger', daggerSchema)

export default Dagger;