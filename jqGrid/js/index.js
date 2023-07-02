const retrieve = () => {
    $.ajax({
        url: "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=yea",
        success,
    });
};

/**
 * new Promise를 사용한다.
 * sub Grid 사용 (grid2)
 **/
const success = (response) => setGlobalData(response).then(setGrid1).then(setGrid2);

/**
 * global data를 세팅한다 (ex: total count)
 **/
const setGlobalData = (response) =>
    new Promise((resolve) => {
        document.querySelector("#totalCount").innerText = response.data.movie_count;
        resolve(response);
    });

/**
 * 첫번째 그리드를 세팅한다 (sorting = year)
 **/
const setGrid1 = (response) =>
    new Promise((resolve) => {
        $("#grid")
            .setGridParam({
                data: response.data.movies,
                loadComplete: () => {
                    resolve(response);
                },
            })
            .trigger("reloadGrid");
    });

/**
 * 두번째 그리드를 세팅한다 (sorting = year)
 * subgrid 사용
 **/
const setGrid2 = (response) =>
    new Promise((resolve) => {
        console.log(response);
        $("#grid2")
            .setGridParam({
                data: response.data.movies,
                subGridRowExpanded: (subgrid_id, index) => {
                    setSubGrid(subgrid_id, index, response);
                },
                loadComplete: () => {
                    resolve(response);
                },
            })
            .trigger("reloadGrid");
    });

const setSubGrid = (subgrid_id, index, response) => {
    const table = document.createElement("table");
    $(`#${subgrid_id}`).append(table);
    $(table).jqGrid({
        datatype: "local",
        data: response.data.movies,
        colModel: [
            { label: "타이틀", name: "title" },
            { label: "장르", name: "genres" },
        ],
        formatter: {
            integer: { thousandsSeparator: ",", defaultValue: "0" },
        },
        loadtext: "로딩중..",
        autowidth: true,
        loadonce: true,
        height: "auto",
        jsonReader: { cell: "" },
        multiselect: true,
        jsonReader: {
            page: "data.page_number",
            total: "data.movie_count",
            root: "data.movies",
            repeatitems: false,
        },
    });
};
