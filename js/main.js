'use strict';

// Needs to be true in order to corectly deactivate later
var isBookingPageActive = true;

/**
 * Activates booking page
 */
var activateBookingPage = function () {
  if (!isBookingPageActive) {
    window.map.enable(function (errorMessage) {
      window.message.error(errorMessage, function () {
        deactivateBookingPage();
      });
    });
    window.noticeForm.enableAddNoticeForm(
        function () { // on form data save success
          deactivateBookingPage();
          window.message.success();
        },
        function () { // on form reset
          deactivateBookingPage();
        },
        function (errorMessage) { // on form data save error
          window.message.error(errorMessage);
        }
    );
    window.filtersForm.enable(
        function (filters) { // on filter change callback
          window.map.renderPins(filters);
        }
    );

    isBookingPageActive = true;
  }
};

/**
 * Deactivates booking page
 */
var deactivateBookingPage = function () {
  if (isBookingPageActive) {
    window.map.disable();
    window.noticeForm.disableAddNoticeForm();
    window.noticeForm.setNoticeAddress(window.map.getMainPinPositionX(), window.map.getMainPinPositionY());
    window.filtersForm.disable();

    isBookingPageActive = false;
  }
};

// page should not be active when opened
deactivateBookingPage();
// initialize main pin drag and drop feature
window.map.initMainPinDragAndDrop(
    function (x, y) { // onDrag handler
      activateBookingPage();
      window.noticeForm.setNoticeAddress(x, y);
    },
    function (x, y) { // onDrop handler
      window.noticeForm.setNoticeAddress(x, y);
    }
);
