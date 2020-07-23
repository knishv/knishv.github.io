let stations = [
  {
    id: "station1",
    name: "Ховрино",
    next: 3,
    prev: 0
  },
  {
    id: "station2",
    name: "Динамо",
    next: 4,
    prev: 3
  },
  {
    id: "station3",
    name: "Водный стадион",
    next: 5,
    prev: 4
  },
  {
    id: "station4",
    name: "Сырные шарики",
    next: 2,
    prev: 5
  },
  {
    id: "station5",
    name: "Владыкино",
    next: 0,
    prev: 2
  }
]

document.addEventListener("DOMContentLoaded", function (event) {
  let input1 = document.querySelectorAll("input")[0];
  let input2 = document.querySelectorAll("input")[1];
  let time = document.getElementById("time");
  function check() {
    let stars = document.querySelectorAll(".icon");
    stars.forEach(element => element.addEventListener("click", () => {
      const result = stations.filter(station => station.id === element.id);
      if (input1.value == "") {
        input1.value = result[0].name;
      } else {
        input2.value = result[0].name;
      };
      if (input1.value.length > 0 && input2.value.length > 0) {
        getTime();
      }

    }
    ));
  }

  function getTime() {
    let el1 = stations.filter(x => x.name === input1.value);
    let el2 = stations.filter(x => x.name === input2.value);
    let firstIndex = stations.indexOf(el1[0]);
    let secondIndex = stations.indexOf(el2[0]);
    compareDiff(firstIndex, secondIndex, el1, el2)
  }
  function compareDiff(index1, index2, el1, el2) {
    let initialValue = 0
    if (input1.value == input2.value) {
      time.innerHTML = 0
    } else if (index2 - index1 == 1) {
      time.innerHTML = el1[0].next;
    } else if (index2 - index1 == -1) {
      time.innerHTML = el1[0].prev;
    } else if (index2 - index1 > 1) {
      let sum = stations.filter((x, index) => index <= index2 && index >= index1).reduce((accumulator, station) => accumulator + station.next, initialValue);
      time.innerHTML = sum - el2[0].next
    } else {
      let sum1 = stations.filter((x, index) => index <= index1 && index >= index2).reduce((accumulator, station) => accumulator + station.prev, initialValue)
      time.innerHTML = sum1 - el2[0].prev
    }
  }
  check();
});

