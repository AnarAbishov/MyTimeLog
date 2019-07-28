$(document).ready(function () {
    $("#AddTaskFrom").submit(function (event) {
        event.preventDefault();
        // get today's date //
        var DateNow = new Date();
        var dateString = moment(DateNow).format('YYYY.MM.DD HH:mm:ss')

        // get value from inputs and create new model //
        var myData = {
            Description: $(this).find("input[name=Description]").val(),
            TimeSpent: $(this).find("input[name=TimeSpent]").val(),
            Date: dateString,
        }

        // ajax send to URL //
        $.ajax({
            
            url: "http://aanar028-001-site2.dtempurl.com/Home/JsonTimeLog",
            type: "POST",
            dataType: "json",
            data: myData,

            // get data from URL //
            success: function (response) {
                // create new model from response //
                var responseNewModel = {
                    Description: response.Description,
                    TimeSpent: response.TimeSpent,
                    Date: moment(dateString).format('DD.MM.YYYY HH:mm:ss')
                }

                // find div from HTML DOM //
                var tabledix = $(".left div:first-child")[0];

                // get today's date //
                var DateNowNew = new Date();
                var DateNowNewString = moment(DateNowNew).format('MMM DD YYYY');

                // find h2 date in first div /// 
                var h2 = $(tabledix).find("h2")[0].innerText;

                // check equality //
                if (h2 == DateNowNewString) {
                    // if appropriate for today's date table  //
                    var x = $(".left div:first-child")[0];
                    var y = $(x).find("tbody:last-child")[0];
                    var element = document.createElement("tr");
                    y.appendChild(element);
                    for (var item in responseNewModel) {
                        var elementInside = document.createElement("td");
                        element.appendChild(elementInside);
                        elementInside.innerText = responseNewModel[item]
                    }
                } else {
                    // if not appropriate for today's date table  //
                    var left = document.querySelectorAll(".left")[0];
                    var tableDiv = document.createElement("div");
                    tableDiv.classList.add("tableDiv");
                    left.insertBefore(tableDiv, left.firstChild);

                    var newH2 = document.createElement("h2");
                    tableDiv.appendChild(newH2);
                    newH2.innerText = DateNowNewString;
                    var table = document.createElement("table");
                    tableDiv.appendChild(table);
                    var tBody = document.createElement("tbody");
                    table.appendChild(tBody);
                    var trHeader = document.createElement("tr");
                    tBody.appendChild(trHeader);
                    for (var item in responseNewModel) {
                        let elementInside = document.createElement("th");
                        trHeader.appendChild(elementInside);
                        elementInside.innerText = item
                    }
                    var tr = document.createElement("tr");
                    tBody.appendChild(tr);
                    for (var item in responseNewModel) {
                        let elementInside = document.createElement("td");
                        tr.appendChild(elementInside);
                        elementInside.innerText = responseNewModel[item];
                    }


                }

            }
        })
    })


   
    
   // pagination //

    var show_per_page = 3;
    var number_of_items = $('#paginate .tableDiv').length;

    var navigation_html = '<a class="previous_link" href=""><<</a>' + '&nbsp';
    var current_link = 1;
    for (var i = 0; i < number_of_items; i = i + show_per_page) {
        navigation_html += '<a class="page_link" href="" data-start="' + i + '" data-end="' + (i + show_per_page) + '">' + (current_link) + '</a>' + '&nbsp';
        current_link++;
    }
    navigation_html += '<a class="next_link" href="">>></a>';
    $('#page_navigation').html(navigation_html);
    rowDisplay(0, show_per_page);

    function rowDisplay(startIndex, endIndex) {
        $('#paginate .tableDiv').hide().slice(startIndex, endIndex).show();
    }

    $('.page_link').click(function (e) {
        e.preventDefault();
        $('.active').removeClass('active');
        $(this).addClass('active');
        var IndexData = $(this).data();
        rowDisplay(IndexData.start, IndexData.end);
    }).first().addClass('active');

    $('.previous_link, .next_link').click(function (e) {
        e.preventDefault();
        var traverse = $(this).is('.previous_link') ? 'prev' : 'next';
        $('.page_link.active')[traverse]('.page_link').click();
    });


})