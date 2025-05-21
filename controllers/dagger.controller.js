import Dagger from "../models/dagger.model.js";
import mongoose from "mongoose";

export const getDaggers = async (req, res) => {
  console.log("getDaggers called")
  try {
    const daggers = await Dagger.find({});
    res.status(200).json({ success: true, data: daggers });
  } catch (error) {
    console.error("error fetching dagger", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

function calculateMortgage(loanAmount, loanTermYears, annualInterestRate) {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Monthly payment formula
  const monthlyPayment =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments));

  const totalPaid = monthlyPayment * totalPayments;
  const totalInterest = totalPaid - loanAmount;

  return {
    monthlyPI: monthlyPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    totalPayment: totalPaid.toFixed(2),
  };
}

export const createDaggers = async (req, res) => {
  const dagger = req.body;
  if (
    !dagger.loanAmount ||
    !dagger.loanTermYears ||
    !dagger.annualInterestRate
  ) {
    return res
      .status(400)
      .json({ success: false, message: "missing dagger information for calc" });
  }

  const result = calculateMortgage(
    dagger.loanAmount,
    dagger.loanTermYears,
    dagger.annualInterestRate
  );
  dagger.monthlyPI = result.monthlyPI;
  dagger.totalInterest = result.totalInterest;
  dagger.totalPayment = result.totalPayment;
  const newDagger = new Dagger(dagger);

  // console.log(dagger)
  // res.status(200).json({ success: true, data: newDagger })
  try {
    await newDagger.save();
    res.status(200).json({ success: true, data: newDagger });
  } catch (err) {
    console.error("ERROR creating dagger", err.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

export const updateDagger = async (req, res) => {
  const { id } = req.params;
  const dagger = req.body;
  const result = calculateMortgage(
    dagger.loanAmount,
    dagger.loanTermYears,
    dagger.annualInterestRate
  );
  dagger.monthlyPI = result.monthlyPI;
  dagger.totalInterest = result.totalInterest;
  dagger.totalPayment = result.totalPayment;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "ID not found" });
  }

  try {
    const updatedDagger = await Dagger.findByIdAndUpdate(id, dagger, {
      new: true,
    });
    console.log(updatedDagger);
    res.status(200).json({ success: true, data: updatedDagger });
  } catch (err) {
    console.error("ERROR updating dagger", err.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

export const deleteDagger = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid dagger ID" });
  }

  try {
    await Dagger.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Dagger Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};
