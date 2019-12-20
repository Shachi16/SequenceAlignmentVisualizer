const UP = [-1,0]
const LEFT = [0, -1]
const TOPLEFT = [-1, -1]
const ORIGIN = [0, 0]

export function globalAlign(v, w, match, mismatch, gap) {
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
      var max_val = Number.NEGATIVE_INFINITY;
      var dir = [ORIGIN];
      if (i == 0 && j == 0) {
        max_val = 0;
        dir = [ORIGIN];
      }

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
  var traceback = traceback_global(v,w, pointers);
  return [M, pointers, traceback]
}

function traceback_global(v, w, pointers) {
    var i = v.length - 1;
    var j = w.length - 1;

    var new_v = [];
    var new_w = [];
    var traceback = [];
    while (true) {
        traceback.push([i, j]);
        // Use first pointer for this cell
        var d = pointers[i][j][0];
        var di = d[0];
        var dj = d[1];
        if (JSON.stringify(d) == JSON.stringify(LEFT)){
            // new_v.append('-');
            // new_w.append(w[j-1]);
        }
        else if (JSON.stringify(d) == JSON.stringify(UP)) {
            // new_v.append(v[i-1]);
            // new_w.append('-');
        }
        else if (JSON.stringify(d) == JSON.stringify(TOPLEFT)) {
            // new_v.append(v[i-1]);
            // new_w.append(w[j-1]);
        }
        var i = i + di;
        var j = j + dj;
        if (i <= 0 && j <= 0) {
            break;
        }
    }
    traceback.push([0,0])
    //return ''.join(new_v[::-1])+'\n'+''.join(new_w[::-1])
    return traceback;
}
