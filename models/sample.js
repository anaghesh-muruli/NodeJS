this.get = function (req, res, next) {
    try {
        req.getConnection(function (connectionError, conn) {
            if (connectionError) {
                //console.error('SQL Connection Error:', connectionError);
                return next(connectionError);
            } else {
                var query = "select * from block order by CreatedOn desc";//sql
                conn.query(query, function (sqlError, result) {
                    if (sqlError) {
                        //console.error('SQL Error:', sqlError);
                        return next(sqlError);
                    }
                    if (result.length >= 1) {
                        res.send(helper.createResponse(helper.Success, helper.successStatusCode, helper.ResultMsg, result));
                    } else {
                        res.send(helper.createResponse(helper.Error, helper.errorStatusCode, helper.noResultMsg, ""));
                    }
                });
            }
        });
    } catch (internalError) {
        //console.error("Internal error:" + internalError);
        return next(internalError);
    }
};