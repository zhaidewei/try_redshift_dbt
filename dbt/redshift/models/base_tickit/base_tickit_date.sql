with source as (

    select * from {{ source('tickit', 'date') }}

),

renamed as (

    select
        dateid,
        caldate,
        day,
        week,
        month,
        qtr,
        year,
        holiday

    from source

)

select * from renamed

