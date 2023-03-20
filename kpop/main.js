const setTimer = (text) => {
  document.getElementById('timer').textContent = text;
};

const fillZero = (number) => {
  if (number < 10) return `0${number}`;
  return number;
 };

 // stole this off stackoverflow
const dateDiff = ( start, end ) => {
  const diff = Date.parse( end ) - Date.parse( start );
  return isNaN( diff ) ? NaN : {
      diff : diff,
      ms : Math.floor( diff            % 1000 ),
      s  : Math.floor( diff /     1000 %   60 ),
      m  : Math.floor( diff /    60000 %   60 ),
      h  : Math.floor( diff /  3600000 %   24 ),
      d  : Math.floor( diff / 86400000        )
  };
};

const main = () => {
  const end = "2023-04-04T07:00:00.000Z";

  setInterval(() => {
    const dt = dateDiff(new Date(), end);
    if (dt.diff > 0) {
      setTimer(`${fillZero(dt.d)}:${fillZero(dt.h)}:${fillZero(dt.m)}:${fillZero(dt.s)}`);

      let description = `${dt.s} seconds`;
      if (dt.diff > 60000) description = `${dt.m} minutes, ${description}`;
      if (dt.diff > 3600000) description = `${dt.h} hours, ${description}`;
      if (dt.diff > 86400000) description = `${dt.d} days, ${description}`;
      document.getElementById('description').textContent = description;
    } else {
      setTimer("He's back!");
    }
  }, 1000);

};

main();
