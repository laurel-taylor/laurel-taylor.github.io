class Coin {
  constructor(value, gold, index) {
    this.value = value;
    this.gold = gold;
    this.inResult = false;
    this.index = index
  }
  get v(){
    return this.value
  }
  get display() {
    return this.toString();
  }
  setInResult(result) {
    this.inResult = result;
  }
  isGold() {
    return this.gold
  }
  valueOf() {
    return this.index
  }
  toString(){
    const className = 'coin ' + (this.value === 0 ? 'blank ' : '') + (this.inResult ? 'in-result ' : '') + (this.gold ? 'entry' : 'border')
    return "<span class='" + className + "' data-gold='"+this.gold+"' data-index='"+this.index+"'>" + this.value + "</span>"
  }
}

class Result {
  constructor(coins) {
    this.coins = coins
  }
  get total() {
    var total = 0;
    var coins = this.coins;
    for(var i=0; i<coins.length; i++) {
      total += coins[i].v;
    }
    return total
  }
  get display() {
    return this.toString();
  }
  toString() {
    var str ="<span class='result'>"
    var coins = this.coins;
    for(var i=0; i<coins.length; i++) {
      str += coins[i].display + (i !== coins.length-1 ? ' + ' : '');
    }
    str += ' = <span class="total">' + this.total + '</span></span>';
    return str
  }
}

function getSilver() {
  let silver = $('#silver').val().split('')
  for(var i=0; i<silver.length; i++) { silver[i] = new Coin(+silver[i], false, i); }
  return silver;
}
function getGold() {
  let gold = $('#gold').val().split('')
  for(var i=0; i<gold.length; i++) { gold[i] = new Coin(+gold[i], true, i); }
  return gold;
}
function getMultiplier() {
  let multiplier = 0
  try {
    multiplier = parseInt($('#multiplier').val())
  } catch (e) {
    console.log('multiplier returning 0')
  }
  return multiplier
}

function getCombos() {
  const echo = parseInt($('#echo').val())
  const core = parseInt($('#core').val())
  const gold = getGold()
  const silver = getSilver()
  const multiplier = getMultiplier()
  showPreview(gold, silver)
  solve(echo, core, multiplier, gold, silver)
}

function hit(x, core, multiplier) {
  if (multiplier > 0) {
    return ((x % core === 0) && ((x / core) === multiplier))
  } else return (x % core === 0)
}

function solve(echo, core, multiplier, gold, silver)
{
  let results = new Array();
  let removedGolds = new Array(0);
  let removedSilvers = new Array(0);

  for (let i = 0; i < gold.length; i++) {
    if(gold[i].v === 0 || removedGolds.includes(i)) continue;
    if (gold[i].v % core !== 0) {
      removedGolds.push(i);
      if (echo !== 3 && echo !== 4) {
        for (let j = 0; j < silver.length; j++) {
          if(silver[j].v === 0 || removedSilvers.includes(j)) continue;
          const x = gold[i].v + silver[j].v;

          if (hit(x, core, multiplier)) {
            results.push(new Result([gold[i], silver[j]]));
          }
        }
      } else if (echo === 3) {
        for (let j = 0; j < silver.length; j++) {
          if(silver[j].v === 0 || removedSilvers.includes(j)) continue;
          const y = gold[i].v + silver[j].v;

          if (y % core !== 0) {
            removedSilvers.push(j)
            //gold, silver, silver
            for (let k = 0; k < silver.length; k++) {
              if(silver[k].v === 0 || removedSilvers.includes(k)) continue;
              const x = gold[i].v + silver[j].v + silver[k].v;

              if (hit(x, core, multiplier)) {
                results.push(new Result([gold[i], silver[j], silver[k]]));
              }
            }
            //gold, silver, gold
            for (let k = 0; k < gold.length; k++) {
              if(gold[k].v === 0 || removedGolds.includes(k)) continue;
              const x = gold[i].v + silver[j].v + gold[k].v;

              if (hit(x, core, multiplier)) {
                results.push(new Result([gold[i], silver[j], gold[k]]));
              }
            }
            removedSilvers.pop();
          }
        }
        //gold, gold, silver
        for (let j = 0; j < gold.length; j++) {
          if(gold[j].v === 0 || removedGolds.includes(j)) continue;
          const y = gold[i].v + gold[j].v;

          if (y % core !== 0) {
            removedGolds.push(j)
            for (let k = 0; k < silver.length; k++) {
              if(silver[k].v === 0 || removedSilvers.includes(k)) continue;
              const x = gold[i].v + gold[j].v + silver[k].v;

              if (hit(x, core, multiplier)) {
                results.push(new Result([gold[i], gold[j], silver[k]]));
              }
            }
            removedGolds.pop()
          }
        }
      } else if (echo === 4) {

        //gold, gold
        for (let j = 0; j < gold.length; j++) {
          if(gold[j].v === 0 || removedGolds.includes(j)) continue;
          const y = gold[i].v + gold[j].v;

          if (y % core !== 0) {
            removedGolds.push(j)
            //gold, gold, gold
            for (let k = 0; k < gold.length; k++) {
              if(gold[k].v === 0 || removedGolds.includes(k)) continue;
              const x = gold[i].v + gold[j].v + gold[k].v;

              if (x % core !== 0) {
                removedGolds.push(k)
                // gold, gold, gold, silver
                for (let m = 0; m < silver.length; m++) {
                  if(silver[m].v === 0 || removedSilvers.includes(m)) continue;
                  const z = gold[i].v + gold[j].v + gold[k].v + silver[m].v;

                  if (hit(z, core, multiplier)) {
                    results.push(new Result([gold[i], gold[j], gold[k], silver[m]]));
                  }
                }
                removedGolds.pop();
              }
            }

            //gold, gold, silver
            for (let k = 0; k < gold.length; k++) {
              if(gold[k].v === 0 || removedGolds.includes(k)) continue;
              const x = gold[i].v + gold[j].v + silver[k].v;

              if (x % core !== 0) {
                removedSilvers.push(k)
                // gold, gold, silver, silver
                for (let m = 0; m < silver.length; m++) {
                  if(silver[m].v === 0 || removedSilvers.includes(m)) continue;
                  const z = gold[i].v + gold[j].v + silver[k].v + silver[m].v;

                  if (hit(z, core, multiplier)) {
                    results.push(new Result([gold[i], gold[j], silver[k], silver[m]]));
                  }
                }
                removedSilvers.pop();
              }
            }
            removedGolds.pop();
          }
        } // end gold/gold

        // gold, silver
        for (let j = 0; j < silver.length; j++) {
          if(silver[j].v === 0 || removedSilvers.includes(j)) continue;
          const y = gold[i].v + silver[j].v;

          if (y % core !== 0) {
            removedSilvers.push(j)
            //gold, silver, silver
            for (let k = 0; k < silver.length; k++) {
              if(silver[k].v === 0 || removedSilvers.includes(k)) continue;
              const x = gold[i].v + silver[j].v + silver[k].v;

              if (x % core !== 0) {
                removedSilvers.push(k)
                // gold, silver, silver, silver
                for (let m = 0; m < silver.length; m++) {
                  if(silver[m].v === 0 || removedSilvers.includes(m)) continue;
                  const z = gold[i].v + silver[j].v + silver[k].v + silver[m].v;

                  if (hit(z, core, multiplier)) {
                    results.push(new Result([gold[i], silver[j], silver[k], silver[m]]));
                  }
                }
                removedSilvers.pop();
              }
            }
            //gold, silver, gold
            for (let k = 0; k < gold.length; k++) {
              if(gold[k].v === 0 || removedGolds.includes(k)) continue;
              const x = gold[i].v + silver[j].v + gold[k].v;

              if (x % core !== 0) {
                removedGolds.push(k)
                // gold, silver, gold, silver
                for (let m = 0; m < silver.length; m++) {
                  if(silver[m].v === 0 || removedSilvers.includes(m)) continue;
                  const z = gold[i].v + silver[j].v + gold[k].v + silver[m].v;

                  if (hit(z, core, multiplier)) {
                    results.push(new Result([gold[i], silver[j], gold[k], silver[m]]));
                  }
                }
                removedGolds.pop();
              }
            }
            removedSilvers.pop();
          }
        }
      }
      removedGolds.pop();
    }
  }
  let string = ''
  for (let i=0; i<results.length; i++) {
    string += results[i].display
  }

  document.getElementById('combos').innerHTML = string;
}

function showPreview(gold, silver) {
  let str = ''
  const newline = '<br/>'
  const blank = '<span class="border blank">&nbsp;</span>'
  // try{
    for(var i=0; i<4; i++) { str += silver[i] ? silver[i].display : blank; }
    str += newline

    str += silver[4] ? silver[4].display : blank
    str += gold[0] ? gold[0].display : blank
    str += gold[1] ? gold[1].display : blank
    str += silver[5] ? silver[5].display : blank
    str += newline

    str += silver[6] ? silver[6].display : blank
    str += gold[2] ? gold[2].display : blank
    str += gold[3] ? gold[3].display : blank
    str += silver[7] ? silver[7].display : blank
    str += newline

    for(var i=8; i<12; i++) { str += silver[i] ? silver[i].display : blank; }
  // } catch(e) {}

  $('#preview').html(str)
}

$(document).ready( function() {
  $('#go').click( function() {
    getCombos();
  });

  $(document).on('keyup change', '#core, #echo, #gold, #silver, #multiplier', function(){
    var $this = $(this);
    getCombos();
    if ($this.attr('id') === 'core') $('#core').select();
  })
  .on('focus', '#core', function(){
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function() {
      // Prevent further mouseup intervention
      $this.unbind("mouseup");
      return false;
    });
  })
  .on('click', '.result', function() {
    $('.selected').removeClass('selected')
    var $this = $(this)
    var $coins = $this.find('.coin')
    $coins.each(function() {
      var coin = $(this)
      var gold = coin.attr('data-gold')
      var index = coin.attr('data-index')
      var previewStr = '#preview [data-gold="' + gold + '"][data-index="' + index + '"]'
      $(previewStr).addClass('selected')
    });
  })
  .on('click', '#preview .entry, #preview .border', function() {
    $('.selected').removeClass('selected')
    $('.hidden').removeClass('hidden')
    var coin = $(this)
    var gold = coin.attr('data-gold')
    var index = coin.attr('data-index')
    var previewStr = '.result .coin[data-gold="' + gold + '"][data-index="' + index + '"]'
    $(previewStr).addClass('selected')
    $('#combos .result').each(function () {
      var $this = $(this)
      if ($this.find('.selected').length <= 0) $this.addClass('hidden')
    })
  });
})
