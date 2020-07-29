
function search_image(){
    //enter key를 입력하면
    if(event.keyCode == 13){

        //alert("검색 시작!!")
        //AJAX를 이용해서 DAUM쪽 Open API를 호출
        $.ajax({
            async : true, //동기 or 비동기
            url :"https://dapi.kakao.com/v2/search/image", //호출할 서버쪽
            data : {
                query : $("#movie_name").val() + " 포스터",
                sort : "accuracy"
            },
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Authorization", "KakaoAK c5eb0de825a9d54ecb4fa1cb4f8534d7")

            },
            type : "GET",
            timeout : 3000,
            datatype : "json",
            success : function(result) {
                //alert("성공성공")
                var img_list = result.documents
                var li = $("<li></li>")
                var img = $("<img />").attr("src",img_list[0].thumbnail_url)
                    .addClass("myImage")
                li.append(img)
                $("ul").append(li)
                //alert(img_list[0].thumbnail_url)
            },
            error : function(error) {
                alert("망함...")
            }
        })
    }
}