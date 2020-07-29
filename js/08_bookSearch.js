
function call_ajax() {
    // 입력 텍스트 상자에서 키보드로 입력이 들어왔을 때 호출
    // 모든 키에 대해서 처리하는게 아니라 enter key일 경우에만 처리
    if( event.keyCode == 13) {
        // 만약 입력된 key가 enter key이면 이 부분을 수행하게 되요!
        // 서버쪽 프로그램을 호출해서 결과를 받아와요!
        // jQuery를 이용해서 AJAX처리 해 보아요!!
        // ajax의 인자로 javascript 객체를 넣어줘요!
        // javascript 객체는 => { key : value, key : value, ...}
        // data : 서버프로그램에게 넘겨줄 데이터들..
        $.ajax({
            async : true,   // 비동기 방식의 호출(default)
            url : "http://192.168.0.200:8080/bookSearch/search",
            data : {
                keyword : $("input[type=text]").val()
            },
            type : "GET",
            timeout : 3000,
            dataType : "json",   // 결과 JSON을 JavaScript객체로 변환.
            success : function(result) {
                $("tbody").empty()

                /**
                 *
                 * <tr>
                 *     <td><img src=...></td>
                 *     <td>제목</td>
                 *     <td>저자</td>
                 *     <td>가격</td>
                 *     <td>
                 *         <input type=button value=삭제>
                 *     </td>
                 * </tr>
                 * */
                // $("h1").each()
                $.each(result,function(idx,item) {
                    var tr = $("<tr></tr>")   // <tr></tr>
                    var imgTd = $("<td></td>") // <td></td>
                    var img = $("<img />").attr("src",item.img)    // <img src=~~~>
                    imgTd.append(img)
                    var titleTd = $("<td></td>").text(item.title)
                    var authorTd = $("<td></td>").text(item.author)
                    var priceTd = $("<td></td>").text(item.price)
                    var delTd = $("<td></td>")
                    var delBtn = $("<input />").attr("type","button")
                        .attr("value","삭제")
                    delBtn.on("click",function() {
                        // 현재 클릭된 버튼에 대한 책 정보를 찾아서 화면에서 삭제
                        // this : 현재 이벤트가 발생된 객체를 지칭!!
                        $(this).parent().parent().remove()
                    })
                    delTd.append(delBtn)

                    tr.append(imgTd)
                    tr.append(titleTd)
                    tr.append(authorTd)
                    tr.append(priceTd)
                    tr.append(delTd)

                    $("tbody").append(tr)

                })

                // for(i=0; i<result.length; i++) {
                //
                //     var tr = $("<tr></tr>")   // <tr></tr>
                //     var imgTd = $("<td></td>") // <td></td>
                //     var img = $("<img />").attr("src",result[i].img)    // <img src=~~~>
                //     imgTd.append(img)
                //     var titleTd = $("<td></td>").text(result[i].title)
                //     var authorTd = $("<td></td>").text(result[i].author)
                //     var priceTd = $("<td></td>").text(result[i].price)
                //     tr.append(imgTd)
                //     tr.append(titleTd)
                //     tr.append(authorTd)
                //     tr.append(priceTd)
                //
                //     $("tbody").append(tr)
                //
                // }


            },
            error : function(error) {
                alert("서버호출 실패!!")
            }

        })
    }

}