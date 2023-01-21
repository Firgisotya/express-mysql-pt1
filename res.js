'use strict';

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
}

exports.nested = function(values, res) {
    const hasil = values.reduce((acc, val) => {
        if(acc[val.nama]){
            const group = acc[val.nama];
            if(Array.isArray(group.matakuliah)){
                group.matakuliah.push(val.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, val.matakuliah];
            }
        } else {
            acc[val.nama] = val;
        }
        return acc
    });
    var data = {
        'statsus': 200,
        'values': hasil
    }

    res.json(data);
    res.end();
}