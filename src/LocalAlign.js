const UP = [-1,0]
const LEFT = [0, -1]
const TOPLEFT = [-1, -1]
const ORIGIN = [0, 0]

export function localAlign(v, w, match, mismatch, gap) {
  //Initialize variables
  var M = []
  var pointers = []
  for (var i = 0; i < v.length; i++) {
    M.push([])
    pointers.push([])
    for (var j = 0; j < w.length; j++) {
      M[i].push(0);
      pointers[i].push([ORIGIN]);
    }
  }

  //Construct Matrix M
  for (var i = 0; i < v.length; i++) {
    for (var j = 0; j < w.length; j++) {
      var max_val = 0;
      var dir = [ORIGIN];

      if (i > 0 && j > 0 && v[i] === w[j]) {
        var temp = M[i - 1][j - 1] + match;
        if (temp > max_val) {
          max_val = temp;
          dir = [TOPLEFT];
        }
        else if (temp == max_val) {
            dir.push(TOPLEFT);
        }
      }

      if (i > 0 && j > 0 && v[i] !== w[j]) {
        var temp = M[i - 1][j - 1] + mismatch;
        if (temp > max_val) {
          max_val = temp;
          dir = [TOPLEFT];
        }
        else if (temp == max_val) {
            dir.push(TOPLEFT);
        }
      }

      if (j > 0) {
        var temp = M[i][j - 1] + gap
        if (temp > max_val) {
          max_val = temp;
          dir = [LEFT];
        }
        else if (temp == max_val) {
            dir.push(LEFT);
        }
      }

      if (i > 0) {
        var temp = M[i - 1][j] + gap
        if (temp > max_val) {
          max_val = temp;
          dir = [UP];
        }
        else if (temp == max_val) {
            dir.push(UP);
        }
      }
      M[i][j] = max_val;
      pointers[i][j] = dir;
    }
  }
  var init_i = 0;
  var init_j = 0;
  // get max score
    var max_score = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < v.length; i++) {
        for (var j = 0; j < w.length; j++) {
            if (M[i][j] >= max_score) {
                max_score = M[i][j];
                init_i = i;
                init_j = j;
            }
        }
    }
    var score = max_score;
    var traceback_and_alignment = traceback_local(v, w, M, init_i, init_j, pointers);
    var traceback = traceback_and_alignment[0];
    var alignment = traceback_and_alignment[1];
    return [M, pointers, traceback, alignment, score];
}

function traceback_local(v, w, M, init_i, init_j, pointers) {
    var i = init_i;
    var j = init_j;

    var new_v = v[i];
    var new_w = w[j];
    var traceback = [];
    while (true) {
        traceback.push([i, j]);
        // Use first pointer for this cell
        var d = pointers[i][j][0];
        var di = d[0];
        var dj = d[1];
        if (JSON.stringify(d) == JSON.stringify(LEFT)){
            new_v = '-' + new_v;
            new_w = w[j-1] + new_w;
        }
        else if (JSON.stringify(d) == JSON.stringify(UP)) {
            new_v = v[i-1] + new_v;
            new_w = '-' + new_w;
        }
        else if (JSON.stringify(d) == JSON.stringify(TOPLEFT)) {
            new_v = v[i-1] + new_v;
            new_w = w[j-1] + new_w;
        }
        var i = i + di;
        var j = j + dj;
        if (M[i][j] == 0) {
            break;
        }
    }
    //traceback.push([0,0])
    var alignment = new_v + '\n' + new_w;
    return [traceback, alignment];
}
