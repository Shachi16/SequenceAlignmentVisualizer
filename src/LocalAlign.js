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

  return [M, pointers]
}
