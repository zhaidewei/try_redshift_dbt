with source as (

    select * from {{ source('tickit', 'event') }}

),

renamed as (

    select
        eventid,
        venueid,
        catid,
        dateid,
        eventname,
        starttime

    from source

)

select * from renamed

