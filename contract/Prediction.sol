// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PredictionMarket {
    struct Prediction {
        address predictor;
        string prediction;
        uint256 betFor;
        uint256 betAgainst;
        bool resolved;
        bool outcome;
    }

    mapping(uint256 => Prediction) public predictions;
    uint256 public predictionCount;

    function makePrediction(string memory _prediction) public {
        predictions[predictionCount] = Prediction({
            predictor: msg.sender,
            prediction: _prediction,
            betFor: 0,
            betAgainst: 0,
            resolved: false,
            outcome: false
        });
        predictionCount++;
    }

    function betForPrediction(uint256 _predictionId) public payable {
        require(!predictions[_predictionId].resolved, "Prediction already resolved");
        predictions[_predictionId].betFor += msg.value;
    }

    function betAgainstPrediction(uint256 _predictionId) public payable {
        require(!predictions[_predictionId].resolved, "Prediction already resolved");
        predictions[_predictionId].betAgainst += msg.value;
    }

    function resolvePrediction(uint256 _predictionId, bool _outcome) public {
        require(msg.sender == predictions[_predictionId].predictor, "Only the predictor can resolve");
        predictions[_predictionId].resolved = true;
        predictions[_predictionId].outcome = _outcome;
        // Add logic to distribute funds based on the outcome
    }
}
