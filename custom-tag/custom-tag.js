class TimeFormatted extends HTMLElement {

    connectedCallback() {
      let date = new Date(this.getAttribute('datetime') || Date.now());
  
      this.innerHTML = new Intl.DateTimeFormat("default", {
        year: this.getAttribute('year') || "년도데이터 없음",
        month: this.getAttribute('month') || "월 데이터 없음",
        day: this.getAttribute('day') || "일 데이터 없음",
        hour: this.getAttribute('hour') || "시간 데이터 없음",
        minute: this.getAttribute('minute') || "분 데이터 없음",
        second: this.getAttribute('second') || "초 데이터 없음",
        timeZoneName: this.getAttribute('time-zone-name') || undefined,
      }).format(date);
    }
  
  }
  
  customElements.define("time-formatted", TimeFormatted);