const inputRowAlert = $("#inputRowAlert");
const inputColAlert = $("#inputColAlert");
const startPositionRowIndex = $("#startPositionRowIndex");
const startPositionColIndex = $("#startPositionColIndex");

function validate(input, isRow) {
    const alertText = "Please enter # from 0 to 19";
    // the case where the input is not a number, not in range from 0 to 19, or the input is a space
    if(isNaN(input) || input < 0 || input > 19 || input.match("[\\s]")) {
        openAlert(isRow, alertText);
        return false;
    }

    removeLeadingZeros(isRow);
    closeAlert(isRow);
    return true;
};

function removeLeadingZeros(isRow) {
    if(isRow) {
        let currentVal = startPositionRowIndex.val();
        noLeadingZeroVal = currentVal.replace(/^0+[0-9]/, currentVal.slice(-1));
        startPositionRowIndex.val(noLeadingZeroVal);
    } else {
        let currentVal = startPositionColIndex.val();
        noLeadingZeroVal = currentVal.replace(/^0+[0-9]/, currentVal.slice(-1));
        startPositionColIndex.val(noLeadingZeroVal);
    }
};

function toggleDiv(isRow, alertText) {
    if(isRow) {
        inputRowAlert.toggleClass("d-none");
        inputRowAlert.html(alertText);
    } else {
        inputColAlert.toggleClass("d-none");
        inputColAlert.html(alertText);
    }
};

function openAlert(isRow, alertText) {
    if(isRow) {
        inputRowAlert.removeClass("d-none");
        inputRowAlert.html(alertText);
    } else {
        inputColAlert.removeClass("d-none");
        inputColAlert.html(alertText);
    }
};

function closeAlert(isRow) {
    if(isRow) inputRowAlert.addClass("d-none")
    else inputColAlert.addClass("d-none")
};

