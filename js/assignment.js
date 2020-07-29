
function listTostr(tmp_list, tmp_attr){
    result_str = ""
    for(i=0; i<tmp_list.length; i++){
        result_str += (tmp_list[i][tmp_attr] + ", ")
    }
    return result_str.substring(0, result_str.length-2)
}

function box_office() {

    var search_date = $("input[type=date]").val()
    search_date = search_date.replace(/-/g, "")


    $.ajax({
        async: true,
        url: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
        data: {
            key: "facac834522a0c1e2b568c3b9fe380fc",
            targetDt: search_date

        },
        type: "GET",
        timeout: 3000,
        dataType: "json",
        success: function (result) {
            $("tbody").empty()

            movie_list = result.boxOfficeResult.dailyBoxOfficeList

            $.each(movie_list, function (idx, item) {
                var tr = $("<tr></tr>")
                var rankTd = $("<td></td>").text(item.rank + "등")
                var imgTd = $("<td></td>")


                $.ajax({
                    async : true,
                    url :"https://dapi.kakao.com/v2/search/image",
                    data : {
                        query : item.movieNm + " 포스터",
                        sort : "accuracy"
                    },
                    beforeSend : function(xhr) {
                        xhr.setRequestHeader("Authorization", "KakaoAK c5eb0de825a9d54ecb4fa1cb4f8534d7")

                    },
                    type : "GET",
                    timeout : 3000,
                    datatype : "json",
                    success : function(result) {
                        var img_list = result.documents
                        var img_url = img_list[0].thumbnail_url
                        var img_td = $("<img/>").attr("src",img_url)
                        imgTd.append(img_td)



                    },
                    error : function(error) {
                        alert("망함...")
                    }
                })


                var movieNmTd = $("<td></td>").text(item.movieNm)
                var salesAccTd = $("<td></td>").text(item.salesAcc)
                var audiAccTd = $("<td></td>").text(item.audiAcc)
                var insertTd = $("<td></td>")
                var insertBtn = $("<input />").attr("type", "button")
                    .attr("value", "영화상세정보")
                insertBtn.on("click", function () {
                    $.ajax({
                        async: true,
                        url: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json",
                        data: {
                            key: "facac834522a0c1e2b568c3b9fe380fc",
                            movieCd: item.movieCd
                        },
                        timeout: 5000,
                        type: "GET",
                        datatype: "json",
                        success: function (movie_detail) {
                            m_detail = movie_detail.movieInfoResult.movieInfo
                            detail_str = ""
                            detail_str += ("영화명:" + m_detail.movieNm + "\n")
                            detail_str += ("제작연도:" + m_detail.prdtYear + "\n")
                            detail_str += ("장르:" + listTostr(m_detail.genres, "genreNm") + "\n")
                            detail_str += ("감독:" + listTostr(m_detail.directors, "peopleNm") + "\n")
                            detail_str += ("배우:" + listTostr(m_detail.actors, "peopleNm") + "\n")
                            alert(detail_str)

                        },
                        error: function (error) {
                            alert("영화 세부정보 확인 실패")
                        }
                    })
                })
                insertTd.append(insertBtn)

                tr.append(rankTd)
                tr.append(imgTd)
                tr.append(movieNmTd)
                tr.append(salesAccTd)
                tr.append(audiAccTd)
                tr.append(insertTd)

                $("tbody").append(tr)

                })


        }
    })

}

