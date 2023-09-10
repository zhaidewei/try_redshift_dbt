with source as (

    select * from {{ source('tickit', 'listing') }}

),

renamed as (

    select
        listid,
        sellerid,
        eventid,
        dateid,
        numtickets,
        priceperticket,
        totalprice,
        listtime

    from source

)

select * from renamed

