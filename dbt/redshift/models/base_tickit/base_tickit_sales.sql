with source as (

    select * from {{ source('tickit', 'sales') }}

),

renamed as (

    select
        salesid,
        listid,
        sellerid,
        buyerid,
        eventid,
        dateid,
        qtysold,
        pricepaid,
        commission,
        saletime

    from source

)

select * from renamed

