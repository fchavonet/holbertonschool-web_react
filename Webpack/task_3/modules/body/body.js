import $ from "jquery";
import { debounce } from "lodash";
import './body.css'

let counter = 0;

function updateCounter() {
    counter += 1;
    $('#count').text(`${counter} clicks on the button`);
}

$(function () {
    $('body').append('<p>Dashboard data for the students</p>');
    $('body').append('<button>Click here to get started</button>');
    $('body').append('<p id="count"></p>');
    $('button').on('click', _.debounce(updateCounter, 500));
});