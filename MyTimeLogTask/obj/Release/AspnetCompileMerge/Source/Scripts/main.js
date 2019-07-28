$(document).ready(function () {
    $("#AddTaskFrom").submit(function (event) {
        event.preventDefault();

        var a = new Date();
        var dateString = moment(a).format('YYYY-MM-DD HH:mm:ss')
     

        var myData = {
            Description: $(this).find("input[name=Description]").val(),
            TimeSpent: $(this).find("input[name=TimeSpent]").val(),
            Date: dateString,
        }  
       

        $.ajax({
            url: "http://localhost:65045/Home/JsonTimeLog",
            type: "POST",
            dataType: "json",
            data: myData,
            success: function (response) {
                var x = $(".left div:first-child")[0];
                var y = $(x).find("tbody:last-child")[0];

                var element = document.createElement("tr");
                y.appendChild(element);

                var o = {
                    Description: response.Description,
                    TimeSpent: response.TimeSpent,
                    Date: moment(response.Date).format('DD.MM.YYYY h:mm:ss')
                }

                for (var item in o) {
                    var elementInside = document.createElement("td");
                    element.appendChild(elementInside);
                    elementInside.innerText = o[item]
                   
                }
                
            }
        })


       

    })


    var a = document.querySelectorAll(".page");
    var pageCount = 1;
    for (var i = 0; i < a.length; i++) {
        $(a[i]).attr('id', 'page' + pageCount);
        pageCount++;
    }

    console.log(pageCount)
    
   

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