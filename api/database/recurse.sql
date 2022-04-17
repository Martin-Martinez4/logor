
WITH RECURSIVE ResponsesCTE AS (
    SELECT
        comment_id,
        parent_id
    FROM
        responses
    WHERE
        parent_id = '8d685d5c-55d1-4274-9e96-1cd72288655b'
    UNION
        SELECT
            e.comment_id,
            e.parent_id
        FROM
            responses e
        INNER JOIN ResponsesCTE s ON s.comment_id = e.parent_id
) SELECT
    *
FROM
    ResponsesCTE;

-- Same Query but without alias
WITH RECURSIVE ResponsesCTE AS (
    SELECT
        comment_id,
        parent_id
    FROM
        responses
    WHERE
        parent_id = '8d685d5c-55d1-4274-9e96-1cd72288655b'
    UNION
        SELECT
            responses.comment_id,
            responses.parent_id
        FROM
            responses
        INNER JOIN ResponsesCTE ON ResponsesCTE.comment_id = responses.parent_id
) SELECT
    *
FROM
    ResponsesCTE;

knex.withRecursive('ResponsesCTE', (qb) => {
  qb.select('parent_id', 'comment_id')
  .from('responses')
  .where('responses.parent_id', 1)
  .union((qb) => {
    qb.select('*')
    .from('responses')
    .join('ResponsesCTE', 'ResponsesCTE.comment_id', 'responses.parent_id')
  })
}).select('*').from('ResponsesCTE')



